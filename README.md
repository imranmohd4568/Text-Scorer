# Text Scorer

Have you ever thought about the quality of your writing? Whether it's for an assignment, a blog,  
or professional communication, **TextScorer** App has got you covered. With Hugging Face models, we analyze your content to identify coherence, structure, and educational value. And the best part?  
It’s simple to use. Input your text, and let our tools analyze and provide feedback in seconds.  
Get ready to take your content to the next level\!

**Features:**  
**1.Text Analysis**: Analyze text using Hugging Face models Gibberish Detector and Education  Classifier.   
**2.History Tracking**: Store analyzed texts and scores in a database. And view historical data in a table with timestamps.  
**3.Interactive Graphs**: Display trends for scores over time.   
**4.Dark/Light Theme**: Toggle themes for the frontend UI.   
**5.Fully Containerized**: Backend and frontend run in Docker containers.

**Repo Structure:**

TextScoringApp/  
│  
├── backend/  
│   ├── app/  
│   ├── Dockerfile  
│   ├── requirements.txt  
│   └── ...  
│  
├── frontend/  
│   ├── src/  
│   ├── Dockerfile  
│   ├── nginx.conf  
│   └── ...  
│  
├── docker-compose.yml  
└── README.md

**Steps for running the repo:**

* Download the zip and extract and run these commands:


| cd TextScoringApp |
| :---- |

| docker-compose up \--build |
| :---- |

Now you will be able to access the:   
**Frontend**: [http://localhost:3001](http://localhost:3001)  
**Backend Docs**: [http://localhost:8001/docs](http://localhost:8001/docs)

**Tech Stack:**

**Backend**: FastAPI (python)  
**Frontend**: React and Tailwind  
**DataBase ORM** : SQLAlchemy ( SQLite DB Engine)  
**Graphs**: Chart.js  
**Deployment**: Docker for containerization

**Backend Implementation from scratch:**

Let's start with backend development first. In the project terminal,

| cd backendpython3 \-m venv venvvenv\\Scripts\\activatepip install fastapi uvicorn sqlalchemy pydantic aiofiles python-multipart transformers torch |
| :---- |

Created a virtual environment and activated it.  
**fastapi**: The main web framework.  
**uvicorn**: ASGI server to run FastAPI apps.  
**sqlalchemy**: ORM for database interactions.  
**pydantic**: For data validation in FastAPI.  
**aiofiles and python-multipart**: To handle file uploads.  
**Transformers and torch**: Need them for using hugging face models.

Initialize the project structure:  
backend/  
	app/  
                 main.py                   
                 database.py              
	     models/                    
		\_\_init**\_\_**.py  
	     routers/	             
		\_\_init\_\_.py  
	     utils/		  
		\_\_init\_\_.py

app/main.py: Sets up FastAPI and includes routing.  
**app/database.py**:  Sets up SQLite and SQLAlchemy  
**app/models/\_\_init\_\_.py**: For creating the db table structure for logging received texts and results.  
**app/routers/analysis.py**: Defined API endpoints in this file i.e,  
/analyze endpoint: Analyzes/scores the text using Gibberish and Education models.  
/history endpoint: Stores all the analyzed or previously scored texts for the history table.  
/delete endpoint: For removing any of the records from the table.

After all implementation of the code,run the backend server (ensure venv is active) using,

| uvicorn app.main:app \--reload |
| :---- |

Test it:

* Go to http://127.0.0.1:8000/docs  
* Use the /analyze POST endpoint to send a test string.  
* Use the /history GET endpoint to view the history .  
* Use the /delete POST endpoint to delete any record from the table.

Download the DB Browser for SQLite application and see the table of records by opening the test.db file.

![][image1]

**Frontend Setup and Integration:**

Create a basic react app in the frontend terminal using,

| npx create-react-app . |
| :---- |

Then integrate tailwind using the steps given on tailwindcss website.   
Implement the codes.

Directory structure:

frontend/  
	/public  
	/src/  
	     components/  
			Footer.js  
			Navbar.js  
	     pages/  
		 AnalyzePage.js  
		 HistoryPage.js  
		 LandingPage.js  
	App.js  
	…  
**Footer.js**: Has the implementation code of footer section.  
**Navbar.js**: Top navigation bar section.  
**AnalyzePage.js**: Implemented the functionality of scoring the inputs i.e text.  
**HistoryPage.js**: Implemented the history table using chart.js  
**LandingPage.js**: Interface/UI of the website/frontend.

Overview:

![][image2]

**Containerization using Docker**: For final deployment, (download Docker desktop)

* Create a Dockerfile in the frontend directory and build the docker image & run  container.

| docker build \-t textscoring-frontend .docker run \-d \-p 3000:80 \--name textscoring-frontend-container textscoring-frontend |
| :---- |


* On running above commands, we can access the frontend on [http://localhost:3000](http://localhost:3000) .  
* Similarly create a Dockerfile for backend, and similarly build the same.  
* We can access backend from http://localhost:8000/docs  
* Now, create a docker-compose.yaml file for combined containerization.  
* Build using docker-compose up \--build  
* We can access the frontend from 3001 port and backend from 8001\. In Fact we can interact with backend from frontend. 

**Overview of localhost:8001 port (backend) after containerizing:** 

![][image3]

**Overview of Docker Desktop (containers built after docker-compose containerization):**





