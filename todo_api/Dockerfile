# Pull base image
FROM python:3.12.4

# Set environment variables
ENV PIP_DISABLE_PIP_VERSION_CHECK=1
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# Set working directory
WORKDIR /code

# Copy the application code
COPY . .

# Install dependencies
RUN pip install -r requirements.txt

# Copy the entrypoint script and make it executable
COPY entrypoint.sh /code/entrypoint.sh
RUN chmod +x /code/entrypoint.sh


# Expose Django's default port
EXPOSE 8000

# Command to run Django server
CMD ["sh", "./entrypoint.sh"]
