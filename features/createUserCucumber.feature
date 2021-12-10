Feature: User Creation

  Background:
    When I go to "https://viktor-silakov.github.io/course-sut/index.html?quick"
    When I login as: "walker@jw.com", "password"

  Scenario: Create user
    When I go to "Create User" menu item
    When I fill form:
      """
      email: 'test@test.com'
      password: 'U&123456'
      address1: 'International str'
      address2: 'apartment 123'
      city: 'Minsk'
      zip: KT00MP
      description: 'test user'
      """
    Then I expect all fields are displayed corresponding data
