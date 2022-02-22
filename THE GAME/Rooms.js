class room {
  constructor(roomID, roomName, roomsConnections, enemiesIDs) {
    this.roomID = roomID;
    this.roomName = roomName;
    this.roomsConnections = roomsConnections;
    this.enemiesIDs = enemiesIDs;
  }
}

let rooms = [
  new room(0, "Entrance", [1], []),
  new room(1, "Hallway", [2], [0]),
  new room(2, "Chamber", [3], [1]),
  new room(3, "Portal - THE END", [], []),
];

module.exports = { rooms };
