Feature: Team

  Background:
    Given a MongoClient connected to "localhost" on port 27017
    And my MongoClient has connected to the "means_db" database

  Scenario: Retrieve Teams
    Given there are no teams in the database
    When I execute an HTTP GET operation on "/api/teams"
    Then there should be no errors
    And the HTTP status code should be 200
    And I should see an empty array of teams
