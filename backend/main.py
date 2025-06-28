from flask import Flask, jsonify, request
from flask_socketio import SocketIO
from flask_cors import CORS
from langchain_community.document_loaders import PyPDFLoader
from ibm_watson_machine_learning.foundation_models import Model
from dotenv import load_dotenv
import os, json
import time

load_dotenv()








app = Flask(__name__)
CORS(app)

socketio = SocketIO(app, cors_allowed_origins="*")


credentials = {
'url': "https://us-south.ml.cloud.ibm.com",
'apikey': os.getenv("IBM_API"),
}

try:
    project_id= os.getenv("IBM_ID")
except KeyError:
    project_id= input("Please enter your project_id (hit enter): ")


template = """
    

    You are a questions creator bot. You are supposed to create questions from the given Resource Base. The question should be
    a Multiple Choice Question and you should give 4 choices for the questions and give the correct choice also for each question.
    All the questions should be in a JavaScript Object Notation (JSON) format. Each question should be numbered sequentially starting from 1.
    Here is a example of output(the options for a questions start with the numbering of 0 so if correct option is the second option, then correct_option_id is 1) for the given Example resource base:
    
    Example Input:
    Resource Base:
    Varun ate a banana today.

    Example Output:
    [
        {{
            "id": 1,
            "question": "What did Varun eat today?",
            "options": [
            "Apple",
            "Banana",
            "Watermelon",
            "Pear"
            ],
            "correct_option": "Banana"
            "correct_option_id" : 1
        }}
    ]

    
    Now create {questionNo} questions from the given resource base.
    Ensure that you create {questionNo} and not less or more than that.
    After generating all the {questionNo} questions, output '[END]' and do not generate any more text.
    Here is the input and output format you should follow:

    Input:
    Resource Base:
    ###
    {base}
    ###

    Output:
    


"""



def augment(template, questionNo, base):
    return template.format(questionNo=questionNo,base=base)




qNo ='0'


@app.route('/upload', methods=['POST'])

def upload():
    file = request.files.get("file")
    file.save(f"./backend/base.pdf")

    global qNo
    qNo = request.form.get("number")
    try:
        socketio.start_background_task(process_pdf_text)
    except:
        return {"status" : "error", "message" : "Failed! Please Upload Again"}, 500

    return {"status" : "success"}, 200




def process_pdf_text():
    
    socketio.emit('progress', {'stage' : 1, 'message' : 'Reading PDF file'})
    socketio.sleep(0)
    
    
    time.sleep(1)

    loader = PyPDFLoader("./backend/base.pdf")
    documents = loader.load()
    pdf_text = "\n".join([doc.page_content for doc in documents])

    os.remove("./backend/base.pdf")
    

    socketio.emit('progress', {'stage' : 2, 'message' : 'Waking up AI species'})
    time.sleep(1)
    socketio.sleep(0)
    
    model_id = "ibm/granite-3-3-8b-instruct"
    gen_parms = {
        "DECODING_METHOD": "sample",
        "TEMPERATURE": 0.7,
        "MAX_NEW_TOKENS": 600,
        "stop_sequences": ["[END]"],
    }
    model = Model(model_id,credentials,gen_parms,project_id)

   
    socketio.emit('progress', {'stage' : 3, 'message' : 'AI is currently speed reading through your PDF'})
    time.sleep(1)
    socketio.sleep(0)

    final_prompt = augment(template, qNo, pdf_text)
    output_raw = model.generate(final_prompt)

    output = output_raw["results"][0]["generated_text"]

    
    socketio.emit('progress', {'stage' : 4, 'message' : 'Final touches'})
    time.sleep(1)
    socketio.sleep(0)

    
    output_text = output.replace("[END]", "")
    global questions
    try:
        questions = json.loads(output_text)
    except json.JSONDecodeError:
        socketio.emit('progress', {'stage' : 4, 'message' : 'Error in generating questions. Please try again.'})
        return {"status" : "error", "message" : "Failed to generate questions. Please try again."}, 500
    
    socketio.emit('progress', {'stage' : 5, 'message' : 'Done'})
    










@app.route('/questions', methods=['GET'])
def get_questions():
    return jsonify(questions)

if __name__ == '__main__':
     socketio.run(app, debug=True)

