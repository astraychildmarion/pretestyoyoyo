import React from 'react';
import Room from './Room';
import { useState, useEffect } from 'react';

function RoomAllocation({ guest, room, onChange }) {
  let [noRoomPeople, setNoRoomPeople] = useState(guest-room)
  // [for increment disdable, for decrease disable]
  let [allRoomDisable, setAllRoomDisabled] = useState([false, false])
  function resultDefault() {
    return Array.from({length:room}, () => ({'adult':1, 'child':0}));
  }
  let [roomResult, setResult] = useState(resultDefault())
  let roomList = [];

  function countTotal(allRoom) {
    let allRoomPeople = 0;
    allRoom.forEach((room) => {
      allRoomPeople += room.adult;
      allRoomPeople += room.child;
    })
    setNoRoomPeople(guest-allRoomPeople)
    return allRoomPeople
  }
  function changeHandler(payload) {
    const roomIndex = payload['roomIndex']
    setResult((roomResult) => {
      roomResult[roomIndex] = payload['people']
      return roomResult
    })
    countTotal(roomResult)
    onChange(roomResult)
  }
	function prepareRoom(room) {
		for (let index = 0; index < room; index++) {
			roomList.push(
				<Room key={index} onChange={changeHandler} roomIndex={index} roomDisabled={allRoomDisable}></Room>
			);
		}
	}

  prepareRoom(room)

  useEffect(() => {
    if (noRoomPeople <= 0) setAllRoomDisabled([true, false])
    else setAllRoomDisabled([false, false])
  }, [noRoomPeople])

	return (
		<>
    <div className='room_allocate-wrapper'>
			<div>
				住客人數：{guest}人/{room}房
			</div>
			<div className='room_not_allocate'>尚未分配人數：{noRoomPeople}</div>
			{roomList}
      </div>
		</>
	);
}
export default RoomAllocation;
