#!/usr/bin/env bash
curl -d 'action=showdown&game_state={
  "players":[
    {
      "name":"Player 1",
      "stack":1000,
      "status":"active",
      "bet":0,
      "hole_cards":[],
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
  "community_cards":[],
  "current_buy_in":0,
  "pot":0
}' localhost:1337
