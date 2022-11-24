const createCounter = () => {
    let history = [0];
    let nodeHistory = [0];
    let position = 0;
    let clickValues = [];

    return {

        value() {
            return history[position];
        },

        setValue(value) {
            if (position < history.length - 1) {
                history = history.slice(0, position + 1);
            }
            history.push(value);
            nodeHistory.push(value);
            position += 1;
        },

        displayHistoryBox() {
            document.getElementById('history').style.display = nodeHistory.length > 1 ? 'block' : 'none';
        },

        setCounterValue() {
            document.getElementById('counter').innerHTML = this.value();
            this.displayHistoryBox();
        },

        setHistoryNode(value) {
            const historyRow = `
             <div>
              <span>${value}</span>
              <span>${nodeHistory[nodeHistory.length - 2]} -> ${nodeHistory[nodeHistory.length - 1]}</span>
             </div>
            `

            const element = document.getElementById("history-box");
            element.innerHTML += historyRow;


            this.setCounterValue();

            clickValues.push(value);

            // console.warn(`Value: ${this.value()}, History: [${nodeHistory}], Position: ${position}`);
        },

        increment(value) {
            this.setValue(this.value() + value);
            this.setHistoryNode(value);
        },

        decrement(value) {
            this.setValue(this.value() - value);
            this.setHistoryNode(-value);
        },

        undo() {
            if (position > 0) {
                position -= 1;

                const element = document.getElementById("history-box");
                element.removeChild(element.children[position]);

                nodeHistory.pop();
            }

            this.setCounterValue();

        },

        redo() {
            if (position < history.length - 1) {
                position += 1;

                nodeHistory.push(this.value());

                this.setHistoryNode(clickValues[position - 1]);
            }

            this.setCounterValue();
        },
    }
}

const counter = createCounter();

counter.displayHistoryBox();





