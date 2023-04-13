# Open Trivia Chat Plugin

## [Watch the Demo Video](https://clipchamp.com/watch/vdLGgeL6Ahb)

Open Trivia Chat Plugin is a Cloudflare Worker that provides a proxy for the Open Trivia Database API. It serves trivia questions and answers and exposes an OpenAPI schema and a manifest file for integration with chat platforms and other services.

## 🔧 Installation

1. Access the ChatGPT UI and select the plugin model from the top drop-down menu.
1. Click on `Plugins` > `Plugin store` > `Install an unverified plugin`.
1. Provide the service URL:

   ```console
   https://opentrivia.drengskapur.workers.dev
   ```

1. This plugin is still in the process of being verified: click `Continue`.

Once the plugin is installed and activated, you can use it in chat conversations. When a relevant question is asked, the model will invoke an API call to the Open Trivia Database API. The model will incorporate API results in its response to the user.

## 🗣️ Example Conversation

**User:** Ask me 3 trivia questions, one by one, and give me the answer after I answer.

**ChatGPT:** Great! Let's start with the first trivia question:

Question 1: In "Mean Girls," who has breasts that tell when it's raining?
A) Gretchen Weiners
B) Janice Ian
C) Cady Heron
D) Karen Smith

Please provide your answer by choosing the letter corresponding to the correct option (A, B, C, or D).

**User:** A

**ChatGPT:** Thank you for your answer. The correct answer is D) Karen Smith. In the movie "Mean Girls," Karen Smith, played by Amanda Seyfried, claims that her breasts can tell when it's raining.

Let's move on to the second trivia question:

Question 2: True or False: In "JoJo's Bizarre Adventure," Father Enrico Pucchi uses a total of 3 stands in Part 6: Stone Ocean.

Please provide your answer by choosing True or False.

**User:** T

**ChatGPT:** Thank you for your answer. The correct answer is True. In "JoJo's Bizarre Adventure: Stone Ocean," Father Enrico Pucchi uses a total of 3 stands: Whitesnake, C-Moon, and Made in Heaven.

Let's move on to the third and final trivia question:

Question 3: What book series published by Jim Butcher follows a wizard in modern-day Chicago?
A) A Hat in Time
B) The Cinder Spires
C) My Life as a Teenage Wizard
D) The Dresden Files

Please provide your answer by choosing the letter corresponding to the correct option (A, B, C, or D).

**User:** D

**ChatGPT:** Thank you for your answer. You are correct! The correct answer is D) The Dresden Files. "The Dresden Files" is a book series written by Jim Butcher that follows the adventures of Harry Dresden, a wizard and private investigator in modern-day Chicago.

Great job! That concludes our trivia questions for today. If you'd like to play again or have any other questions, feel free to ask!

## 📄 License

This project is licensed under the [MIT License](LICENSE). Please see the [LICENSE](LICENSE) file for more information.
