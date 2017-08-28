'use strict';

const Alexa = require('alexa-sdk');

const APP_ID = undefined;  // TODO replace with your app ID (OPTIONAL).

const handlers = {
    'LaunchRequest': function () {
        this.emit(':ask', 'Welcome to the Number Game; the game where you say any number and get points for some reason. Would you like to play?');
    },
    'AMAZON.YesIntent': function () {
        if (this.attributes['gameState'] != 'started')
        {
            var speechOutput = "Great. Let us get started. What is your favourite number?";
            this.attributes['gameState'] = 'started';
        }
        else
            var speechOutput = "You've already started the game you maniac. What is your number?";
        
        this.emit(':ask', speechOutput);
    },
    'AMAZON.StopIntent': function () {
        if (this.attributes['gameState'] == 'started')
        {
            var speechOutput = "You have stopped the game.";
            this.attributes['gameState'] = 'stopped';
        }
        else
            var speechOutput = "You can't stop a game that hasn't started. Would you like to play?";
            
        this.emit(':ask', speechOutput);
    },
    'numberIntent': function () {
        if (this.attributes['gameState'] == 'started')
        {
            var userNumber;
            var speechOutput;
            
            if (this.event.request.intent.slots.numberVal.value)
            {
                userNumber = this.event.request.intent.slots.numberVal.value;
                speechOutput = userNumber + " is a great number. Say another number.";
            }
            else
                speechOutput = "Please provide a number";
        }
        else
            speechOutput = "You can't play the number game without starting the number game you plonka. Would you like to play?";
            
        this.emit(':ask', speechOutput);
    },
    'SessionEndedRequest': function () {
        this.emit(':tell', "I am exiting");
    }
};

exports.handler = function (event, context) {
    const alexa = Alexa.handler(event, context);
    alexa.APP_ID = APP_ID;
    // To enable string internationalization (i18n) features, set a resources object.
    alexa.registerHandlers(handlers);
    alexa.execute();
};
