Feature: Failed login

Scenario: Failed login for all invalid users' credentials
  When I go to "https://viktor-silakov.github.io/course-sut/index.html?quick" 
  When I log in as :


      | login             | password      |
      | walker@jw.com'    | password1     |
      | walker@jw.com'    |               |
      |                   | password      |
      | old_walker@jw.com | password1     |
      | password          | walker@jw.com |
      | admin             | admin         |
      | user              | 123           |
      | dlink             | dlink         |
      | user              |               |
      | admin             |               |
      |                   |               |

  When I click Login button
  Then I expect error message Fail to login