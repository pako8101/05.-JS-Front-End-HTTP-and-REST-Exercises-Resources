function attachEvents() {
    
    const baseUrl = 'http://localhost:3030/jsonstore/messenger';

    const [nameInput,contentInput,sendButton,refreshButton] = document.getElementsByTagName('input');
    const messagesTextArea = document.getElementById('messages');

    sendButton.addEventListener('click', async () =>{
        const messageFormat = {
            author: nameInput.value,
            content: contentInput.value
        };

        let isValidMessage = nameInput.value !== ''
        && contentInput !== '';

if (isValidMessage) {
      await fetch(baseUrl,{
            method:'POST',
            body: JSON.stringify(messageFormat)
        });
}
      
        nameInput.value = '';
        contentInput.value = '';
    });

    refreshButton.addEventListener('click',async () => {
        
        const response = await fetch(baseUrl);

        const messages = await response.json();

        const messagesToDisplay = [];

        for (const messageInfo of Object.values(messages)) {
            
            messagesToDisplay.push(`${messageInfo.author}: ${messageInfo.content}`);

        }
 messagesTextArea.textContent = messagesToDisplay.join('\n')
  
        

    })
   

}

attachEvents();      console.log(messages);