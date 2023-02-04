# Futbol Means

This application was created to help deal with issues I was having gathering data
for my daughters High School Soccer team.  In particular during matches we want to
gather as much data as possible during the matches.  This data includes minutes
played, player statistics, statistics for keepers and the like.

It's just too difficult to keep up with this using notes so I figured
it would be easier in an app to setup a team, add a match, start a match
and let the app track the clock.  Easily setup the starting lineup and
swap players in and out (while tracking the times) to automate the 
minutes played calculations so I don't have to worry about that.  I 
also figured it would be easy to tap to create an event like a goal
for example and have the app show me the roster to select who scored
the goal and which player/players assisted it.  Keeper saves would 
also represent an event.

## Statistics

Below I've detailed some of the statistics that seem pertinent to track, at least for high school Soccer.

In order to do this for each match I'll need to track the following:

* The number of minutes played by each player (Min)
* The number of goals scored by each player (Goals/G) along with the times those goals occurred (was it a PK?, was it the game winner?).
* The number of assists accrued by each player (Asst) along with the times those assists occurred.
* Each shot a player took and when (was it on goal? did the keeper save it?)
* How many steals a player had (and when)
* How many PK's a player attempted (and when)
* How many corner kicks a player took (when was it taken? and from which side?)
* How many yellow cards a player received (and when)
* How many red cards a player received (and when)

Now each of these things boils down to an event, so the user interface for such an application will have to make
creating events very easy to do (fewer clicks and typing the better).

Each event is something where we want to store the time of occurrence relative to the game clock.
Each event has potentially unique metadata about it.

Question: What events are there?
Answer:
* Goal
* Save
* Kick Off
* Half Time
* End of Match
* Foul
* Substitution
* Injury
* Corner Kick
* Free Kick
* Throw In

## Events

### Goal
The user generates a Goal event.  The application then displays the roster and asks the user who scored?
The user selects the player from the roster that appears to have scored the goal and records the current time
from the game clock.  The application then allows the user to award one or more players with an assist.

A Goal Event has an assigned player.  
A Goal Event can have zero or more awarded assists.  
A Goal Event has a timestamp.

### Save
The user generates a Save event.  The application automatically assigns the current keeper to the event.

A Save Event has an assigned player.
A Save Event has a timestamp.

### Kick Off
The user generates a Kick Off event.  The application associates the starting lineup to the Kick Off event.
The Kick Off Event has a timestamp.

### Half Time
The user generates a Half Time event.  The application resets the game clock.
The Half Time event has a timestamp.

### End Of Match
The user generates an End Of Match event.  The application stops the game clock.
The End Of Match event has a timestamp.

### Foul
The user generates a Foul event.  The application displays the roster and allows the user to specify the offending
player.
The Foul Event has a timestamp.

### Substitution
The user generates a substitution event.  The application displays the list of players currently on the field along
with a list of players that are not.  The application allows the user to specify players going in and players going out.
The Substitution Event has a timestamp.

A Substitution Event has one or more players going out.
A Substitution Event has one or more players coming in.
A Substitution Event has a timestamp.

### Injury
The user generates an injury event.  The application displays the list of players currently on the field allowing the
user to select the player that appears to be injured.

The Injury Event has a potential player assignment.
The Injury Event has a timestamp.

### Corner Kick
The user generates a corner kick event.  The application displays the list of players currently on the field allowing
the user to select the player that appears to be taking the corner kick.

The Corner Kick Event has a player assignment.
The Corner Kick Event has a timestamp.

### Free Kick
The user generates a freek kick event.  The application displays the list of players currently on the field allowing
the user to select the player that appears to be taking the free kick.

The Free Kick Event has a player assignment.
The Free Kick Event has a timestamp.

### Throw In Event
The user generates a throw in event.  The application displays the list of players currently on the field allowing
the user to select the player that appears to be taking the throw in.

The Throw in event has a player assignment.
The Throw in event has a timestamp.

### General

| Header | Name         | Description                                                      |
|--------|--------------|------------------------------------------------------------------|
| GP     | Games Played | How many games the player has participated in during the season. |


### Field Player Statistics

| **Header** | **Name** | **Description** |
|---|---|---|
| Assists | Asst | Each assist made is worth one point. An assist is awarded for an offensive pass leading directly to a goal. It is possible to award two assists for one goal (ie- a corner kick headed by an offensive player to a teammate who scores). An assist may also be awarded from an indirect penalty kick or a throw-in. When a shot is deflected (off the post or a defensive player) and an offensive player immediately knocks the rebound in for a goal, the offensive player who took the first shot should be awarded an assist. |
| Shots Taken | Shots/Shts | A shot is an attempt that is taken with the intent of scoring and is directed toward the goal. A cross or crossing pass is not a shot. A goalkeeper who intercepts a cross is not credited with a save. Exception: A cross that the goalkeeper stops that otherwise would have entered the goal is considered a shot, and the goalkeeper is credited with a save. |
| Shots on Goal | SOG | A shot on goal is a shot that is on net. The results of a shot on goal must be either a save by the goalkeeper or defending team or a goal by the attacking team. A shot that hits the post or crossbar without being deflected by a goalkeeper or defender and does not cross the goal line is not a shot on goal. |
| Steals | Stls | Steals are given when a player forces an opponent turnover and gains possession of the ball. Receiving an errant pass is not a steal. |
| Assist Per Game | A/G | The average number of assists an athlete makes per game. (Assists/Total Games Played) |
| Points | Pts | An athlete is awarded 2 points for every goal scored and 1 point for every assist giving them their total points. |
| Points Per Game | P/G | The average number of points an athlete has per game. (Points/Total Games Played) |
| Penalty Kicks Made | PKG | Number of goals scored on penalty kicks. |
| Penalty Kicks Attempted | PKA | Number of penalty kicks attempted by a player. |
| Corner Kicks | CK | Number of kicks taken from either end of the goal line. |
| Game Winning Goal | GWG | Player to score the goal to win the game. |
| Yellow Card | YC | Number of formal Cautions given to a player by the referee. |
| Red Card | RC | Player ejected form the game by the referree. |
| Shots Per Match | S/G | The average number of shots per game. |
| Shots On Goal Per Match | SOG/G | The average number of shots on goal per game. |
| Shots On Goal Percentage | SOG % | The percentage of made shots on goal (Goal/SOG=SOG%). |

### Keeper Statistics

| **Header** | **Name** | **Description** |
|---|---|---|
| Minutes Played | Min | Number of minutes the goal keeper plays. Generally, this number is rounded to the nearest whole minute. High school regulation time is 40 minutes per half. |
| Overtime Minutes | OTMin | Number of minutes played in extra period. |
| Goals Against | GA | Number of goals scored against the team while the goal keeper is playing in the goal. |
| Goals Against Average | GAA | GAA = (GA * 90) / Min |
| Goals Saved | Sa | A save is awarded to a goal keeper only if a shot otherwise would have gone into the goal- regardless of whether the ball is caught or deflected. A save is NOT awarded for intercepting a crossed ball. Saves made by a defensive player other than the goal keeper are "Team Saves" and are not currently tracked by MaxPreps. |
| Opponent Shots On Goal | SOG | Number of opponent shots on goal. |
| Opponent Penalty Kick Saves | PKS | Number of saaves on penalty kicks by opponent. |
| Opponent Penalty Kick Attempts | PKA | Number of penalty kicks attempted by opponent. |
| Shut Out | SO | Goal keeper receives credit for a shut out only by playing the entire contest and not allowing any goals.  If both keepers play the entire game to a final score of 0-0, both keepers should be credited with a shut out. |
| Win | Win | The win is credited ot the goalie on the field when the winning goal was scored. |
| Loss | Loss | The loss is credited to the goalie on the field when the opponent scored the winning goal. |
| Tie | Tie | The tie is credited to the goalie on the field when the goal to tie was made. |
| Saves Per Match | S/G | The average number of saves per game. |
| Saves Percentage | Save % | The percentage of saves (Sa/SOG = Save%) |


## Use Cases

Users must be able to log in.

Each user must be able to create a team.

Each user must be able to add a roster to the team.

Each roster consists of players.

A player has a set of positions.


Once a team is selected, the user must be able to create match.

A match has an opponent.

A user must be able to setup the starting lineup.



## References

* [Node Express Typescript](https://developer.okta.com/blog/2018/11/15/node-express-typescript)
