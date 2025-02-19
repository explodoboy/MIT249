// A lot of this code comes from StackOverflow, specifically from user [ggloren]. I tried not to straight-up copy it though, since I actually wanted to learn.

const fetchCompletion = async input => {
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
                    content: input,
                }
            ],
            model: "gpt-4o",
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

$("form").submit(async function(e) {
    e.preventDefault();

    var target, input, output;
    target = e.target || e.srcElement;
    input = target.querySelector("input").value;

    try {
        output = await fetchCompletion(input);

        $("#output").replaceWith(output);
    }
    catch (err) {
        console.error(err.message);
    }

    return true;
});