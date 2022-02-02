class QueueElement {
    constructor(entity, priority) {
        this.entity = entity;
        this.priority = priority;
    };

    getElement() {
        return this.entity;
    }
};

class PriorityQueue {

    constructor() {
        this.elements = [];
        this.size = 0;
    };


    enqueue(element) {
        var tempArray = [];
        var tempArray = tempArray.concat(element);
        for (let i = 0; i < tempArray.length; i++) {

            var priority = 0;
            if (tempArray[i] instanceof Terrain) {
                priority = 5;
            }
            else if (tempArray[i] instanceof masterchief) {
                priority = 4;
            }
            else if (tempArray[i] instanceof AbstractEnemy) {
                priority = 3;
            }
            else if (tempArray[i] instanceof bullet || tempArray[i] instanceof EnemyBullet) {
                priority = 2;
            }
            else {
                priority = 1;
            }
            var qElement = new QueueElement(tempArray[i], priority);
            this.enqueueHelper(qElement);
        }
        
    };

    enqueueHelper(qElement) {
        var contains = false;
        for (var i = 0; i < this.elements.length; i++) {
            if (this.elements[i].priority > qElement.priority) {
                this.elements.splice(i, 0, qElement);
                contains = true;
                break;
            }
        }
        
        if (!contains) {
            this.elements.push(qElement);
        }
    }

    dequeue() {
        for (var i = 0; i < this.size; i++) {
            var obj = this.element[i].getElement();
            if (!obj.removeFromWorld) {
                this.elements[i].shift();
            }
    }
    }

    isEmpty() {
        return this.elements.length ==  0;
    };

    printQueue() {
        var items = "";
        for (var i = 0; i < this.elements.length; i++) {
            items += this.elements[i].entity + " ";
        }
        return items;
    };

    getElements() {
        var elementsOnly = [];
        for (var i = 0; i < this.elements.length; i++) {
            elementsOnly.push(this.elements[i].getElement());
        }
        return elementsOnly;
    };

    forEach() {

    }
};