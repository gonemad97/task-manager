from flask import request, jsonify
from app import create_app, db
from app.models import Task

app = create_app()

@app.route('/tasks', methods=['GET', 'POST'])
def handle_tasks():
    if request.method == 'GET':
        completed = request.args.get('completed')
        if completed == "true":
            tasks = Task.query.filter(Task.completed == True)
        else:
            tasks = Task.query.all()
        return jsonify([{'id': task.id, 'title': task.title, 'description': task.description, 'completed': task.completed} for task in tasks]), 200
    if request.method == 'POST':
        pass
    # Add POST logic here

# Add more routes here