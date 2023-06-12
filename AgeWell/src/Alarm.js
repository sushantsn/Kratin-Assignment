import React, { useState } from 'react';

const Alarm = () => {
  const [alarmList, setAlarmList] = useState([]);

  const deleteAlarm = (idx) => {
    const updatedAlarmList = [...alarmList];
    updatedAlarmList.splice(idx, 1);
    setAlarmList(updatedAlarmList);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const alarmTimeInput = document.getElementById('alarm_time');
    const alarmTime = alarmTimeInput.value;
    const newAlarm = {
      alarm_time: alarmTime,
    };
    const updatedAlarmList = [...alarmList, newAlarm];
    setAlarmList(updatedAlarmList);
    alarmTimeInput.value = '';
  };

  return (
    <section className="container">
      <h3>Today's alarms: {alarmList.length}</h3>
      <div id="alarm_list">
        {alarmList.map((data, idx) => (
          <div className="list-item" key={idx}>
            <div className="alarm" style={{ fontSize: '24px' }}>{data.alarm_time}</div>
            <div style={{ marginLeft: '10px' }}>
              <button className="rem-alarm" onClick={() => deleteAlarm(idx)}>
                <i className="fa fa-trash"></i> Delete
              </button>
              <div className="section-space"></div>
            </div>
          </div>
        ))}
      </div>
      <div id="form-wrapper" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <form onSubmit={handleFormSubmit} id="alarm-form">
          <input type="time" className="form-input" id="alarm_time" required style={{ fontSize: '24px', width: '200px' }} />
          <button type="submit" id="form-button" title="Save Item">
            <i className="fa fa-save"></i> Add
          </button>
        </form>
      </div>
      <audio id="alarm-audio" src="./alarm-sound.wav" loop></audio>
    </section>
  );
};

export default Alarm;
