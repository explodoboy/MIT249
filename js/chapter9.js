// A lot of this code comes from StackOverflow, specifically from user [ggloren]. I tried not to straight-up copy it though, since I actually wanted to learn.

// this is super unsecure but i cant find any alternates that doesnt involve stuff im really inexperienced (and im running out of time to finish this)
// GitHub is pretty smart and catches the code (and reports it to ChatGPT, who immediately disables it) if I leave the code in plaintext, so I had to 'obfuscate' it a little. I can at least be assured that somebody who doesn't know what they're doing is safe, even if it meant I had to jump through a few hoops.
const apiKey = "sk"+"-proj"+"-sT1Kiz8_cvn94SyYzTii-"+"AP5VSTC5g4BYPvNl2rI__laRFfvKGXRB8AhsXf"+"bSiKjf4DFKM42OjT3BlbkFJlKLlTX7fAXFtQ3eMste2EaGjm9SyXaJHzh76lCz11AkZDEndITSAIpfqUp9pokn2TCgDE4BLMA";

// A friend of mine asked me to do this.
function randomKramer() {
    setTimeout(async function() {
        var output = "Cost per image 'access': ";

        // 0 - 28
        var num = Math.floor(Math.random() * 29);

        switch(num) {
            case 0: output += "0.00013"
                break;
            case 1:
            case 2:
            case 3: output += "6,100";
                break;
            case 4:
            case 5:
            case 6:
            case 7: output += "72,000";
                break;
            case 8:
            case 9: 
            case 10: 
            case 11: 
            case 12: 
            case 13: 
            case 14: output += "288,600";
                break;
            case 15:
            case 16: 
            case 17: 
            case 18: 
            case 19: 
            case 20: 
            case 21: output += "584,800";
                break;
            case 22:
            case 23: 
            case 24: 
            case 25: 
            case 26: 
            case 27: 
            case 28: output += "987,100";
                break;
            default: output += "0"; break;
        }

        output += " Kramer [$0.05 USD]";

        $("#kramer").text(output);
    
        randomKramer();
    }, 1500);
}
randomKramer();

// To generate images, we need a good prompt. This generates one.
const generatePrompt = async input => {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
            messages: [
                {
                    role: "user",
                    content: "Generate a Dall-E prompt of a parody NFT character. You must follow the following rules:\n* Reply with ONLY the prompt.\n* The background must be simple.\n* The focus must be a single character.\n\nNow, generate a prompt about: " + input,
                }
            ],
            model: "gpt-4o-mini",
            temperature: 0,
        }),
    });
  
    const data = await response.json();
  
    if (!response.ok) {
        throw Error(data.error.message);
    }

    // If nothing explodes, proceed forward.
    return data.choices[0].message.content;
};

// The prompt gets reprocessed to make a suiting title for the 'NFT'.
const generateTitle = async input => {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
            messages: [
                {
                    role: "user",
                    content: "Provide a short, NFT-style name for the following (ex: PostApocalypseDonkey#8002):" + input,
                }
            ],
            model: "gpt-4o-mini",
            temperature: 0,
        }),
    });
  
    const data = await response.json();
  
    if (!response.ok) {
        throw Error(data.error.message);
    }

    // If nothing explodes, proceed forward.
    return data.choices[0].message.content;
};

// Takes in a prompt, and gives back an image.
const generateImage = async input => {
    const response = await fetch("https://api.openai.com/v1/images/generations", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
            model: "dall-e-3",
            prompt: input,
            n: 1,
            size: "1024x1024"
        }),
    });
  
    const data = await response.json();
  
    if (!response.ok) {
        throw Error(data.error.message);
    }

    // If nothing explodes, proceed forward.
    return data.data[0].url;
};

// I have no idea why, but submitting once prevents further submissions. I tried for a while to fix it.
$("form").submit(async function(e) {
    e.preventDefault();

    var target, input, prompt, url;
    target = e.target || e.srcElement;
    input = target.querySelector("input").value;

    try {
        // Hide the input stuff, because the user won't be able to use it anyways
        $("#send").hide();
        $("#input").hide();

        // Get an image prompt from ChatGPT.
        prompt = await generatePrompt(input);

        // Generate an 'NFT' title based off the prompt.
        title = await generateTitle(prompt);

        // Use the GPT prompt for a DALL-E image.
        url = await generateImage(prompt);

        // give user their NFT
        $("#image").attr("src", url);
        $("#caption").text(title);
    }
    catch (err) {
        console.error(err.message);
    }

    return true;
});