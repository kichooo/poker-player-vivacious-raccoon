curl -d 'action=bet_request&game_state={
  "players":[
    {
      "name":"Player 1",
      "stack":1000,
      "status":"active",
      "bet":0,
      "hole_cards":[{"rank": "K", "suit": "clubs"}, {"rank": "K", "suit": "hearts"}],
      "version":"Version name 1",
      "id":0
    },
    {
      "name":"Player 2",
      "stack":1000,
      "status":"active",
      "bet":0,
      "hole_cards":[],
      "version":"Version name 2",
      "id":1
    }
  ],
  "tournament_id":"550d1d68cd7bd10003000003",
  "game_id":"550da1cb2d909006e90004b1",
  "round":0,
  "bet_index":0,
  "small_blind":10,
  "orbits":0,
  "dealer":0,
  "community_cards":[{"rank": "10", "suit": "clubs"}, {"rank": "K", "suit": "spades"}, {"rank": "Q", "suit": "hearts"}],
  "current_buy_in":10,
  "pot":0,
  "in_action": 0,
  "minimum_raise": 5
}' localhost:1337
