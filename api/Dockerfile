# Use an official Python runtime as the base image
FROM python:3.9

# Set the working directory for the FastAPI app
WORKDIR /api

# Copy FastAPI application code and poetry files
COPY pyproject.toml poetry.lock ./
COPY . .
# Install Python dependencies using poetry
RUN pip install --no-cache-dir poetry && poetry install

# Expose port (FastAPI: 8000)
EXPOSE 8000

RUN echo "$PWD"

# Start the FastAPI application
CMD ["poetry", "run", "uvicorn", "index:app", "--host", "0.0.0.0", "--port", "8000"]
