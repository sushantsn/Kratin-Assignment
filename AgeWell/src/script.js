/* eslint-disable no-undef */
/* eslint-disable no-restricted-globals */
// Start Button
const startBtn = document.getElementById('startBtn')
// Digital Clock Container
const digitalClockEl = document.getElementById('clock-wrapper')
// Digital Clock Content Selector
const digitalClock = document.getElementById('digital-clock')
// Alarm Form Selector
const alarmForm = document.getElementById('alarm-form')

// Alarm List Container
const alarmEl = document.getElementById('alarm_list')

// Alarm List
let alarmList = JSON.parse(localStorage.getItem('alarm_list')) || []

let alarmAudio = new Audio()
    alarmAudio.src = `alarm-sound.wav`

    alarmAudio.loop = true

    alarmAudio.onpause = function(){
        alarmAudio.currentTime = 0
    }

let currentDate;
// Initialize Digital Clock
const digitalClockInit = () =>{
    setInterval(()=>{
        var now = new Date();
        hour = now.getHours()
        min = now.getMinutes()
        sec = now.getSeconds()
        am_pm = hour > 12 ? "PM" : "AM";
        var hour12 = hour > 12 ? hour - 12 : hour;
        hour = String(hour).padStart(2, 0);
        hour12 = String(hour12).padStart(2, 0);
        min = String(min).padStart(2, 0);
        sec = String(sec).padStart(2, 0);
        currentDate = `${hour}:${min}`;
        digitalClock.innerText = `${hour12}:${min}:${sec} ${am_pm}`;
        checkAlarm()
    },500)
    loadAlarmList()
}

// Load Alarm List
const loadAlarmList = () => {
    alarmEl.innerHTML = ``
    alarmList.forEach((data, idx)=>{
        var div = document.createElement(`div`)
            div.classList.add('list-item')
            div.innerHTML = `<div class="alarm"></div>
                             <div class="alarm-switch">
                             <label class="switch">
                                <input type="checkbox">
                                <span class="slider round"></span>
                             </label>
                             </div>
                             <div class=""><a class="rem-alarm"><i class="fa fa-trash"></i></a></div>`;
        var time = data.alarm_time
            time = time.split(":")
            am_pm = parseInt(time[0]) > 12 ? "PM" : "AM"
            hour = parseInt(time[0]) > 12 ? parseInt(time[0]) - 12 : parseInt(time[0])
            hour = String(hour).padStart(2, 0)
            div.querySelector('.alarm').innerText = `${hour}:${time[1]} ${am_pm}`
            if(data.status == 1){
                div.querySelector('.switch input[type="checkbox"]').setAttribute('checked', true)
            }
        alarmEl.appendChild(div)
        div.querySelector('.rem-alarm').addEventListener('click', e => {
            e.preventDefault()
            deleteAlarm(idx)
        })
        div.querySelector('.switch input[type="checkbox"]').addEventListener('change', () =>{

            var is_checked = div.querySelector('.switch input[type="checkbox"]').checked
            updateAlarmStatus(idx, is_checked)
        })
    })
}

// Delete Alarm 
const deleteAlarm = (idx) => {
    if(confirm(`Are you sure to remove this alarm item?`) === true){
        if(alarmList[idx])
            delete alarmList[idx]
        alarmList = alarmList.filter(el => el)
        localStorage.setItem('alarm_list', JSON.stringify(alarmList))
        loadAlarmList()
    }
}

// Update Alarm Status 
const updateAlarmStatus = (idx, is_checked) => {
    if(alarmList[idx])
        alarmList[idx].status = (is_checked == true) ? 1: 0;
    localStorage.setItem('alarm_list', JSON.stringify(alarmList))
    loadAlarmList()
    checkAlarm()
    
}

// Check Alarm 
const checkAlarm = async () =>{
    var has_alarm = false;
    await alarmList.forEach(data =>{
        if(data.status == 1 && currentDate >= data.alarm_time){
            has_alarm = true
        }
    })
    if(has_alarm){
        alarmAudio.play()
    }else{
        alarmAudio.pause()
    }
}

// Form Submit
alarmForm.addEventListener('submit', e=>{
    e.preventDefault()
    var alarm = document.getElementById('alarm_time').value
    alarmList.push({
        alarm_time: alarm,
        status:1
    })
    localStorage.setItem('alarm_list', JSON.stringify(alarmList))
    alarmForm.reset();
    loadAlarmList();
})
window.onload = function (){
    document.body.appendChild(alarmAudio)

    startBtn.addEventListener('click', e => {
        e.preventDefault()
            digitalClockEl.style.display = `block`
            alarmForm.closest('#form-wrapper').style.display = `block`
            alarmEl.style.display = `block`
            startBtn.style.display = `none`
            digitalClockInit()
        
    })
}
