# Step 1: Use the official Python image
FROM python:3.12-slim

# Step 2: Set the working directory inside the container
WORKDIR /app

# Step 3: Copy requirements.txt into the container
COPY requirements.txt .

# Step 4: Install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Step 5: Install certificates
RUN apt-get update && apt-get install -y ca-certificates && update-ca-certificates

# Step 6: Install curl for debugging
RUN apt-get update && apt-get install -y curl

# Step 5: Copy the entire backend codebase into the container
COPY . .

# Step 6: Expose the port the app runs on (FastAPI default: 8000)
EXPOSE 8000

# Step 7: Command to run the app using Uvicorn
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000", "--reload"]
