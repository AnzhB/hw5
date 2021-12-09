Feature: ATM withdraw
   As an Account Holder
   In Order to get money
   I want to withdraw cash from an ATM

 Scenario Outline: ATM withdraw leads to right message <messageText>
    Given my account balance is "<accBalance>"
    And the ATM contains "<moneyAviabilityATM>"
    When I withdraw "<withdrawCash>"
    Then I get "<messageText>" message
    
Examples:
      | accBalance | moneyAviabilityATM| withdrawCash | messageText                          |
      | 500        | 600               | 50           | Take your money!                     |
      | 500        | 600               | 550          | You don't have enough money!         |
      | 500        | 150               | 300           | The machine is not have enough money!|