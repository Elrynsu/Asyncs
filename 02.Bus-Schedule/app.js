function solve() {

    const departBtn = document.querySelector('#depart');
    const arriveBtn = document.querySelector('#arrive');

    const infoBox = document.querySelector('.info');
    let stop = {
        next: 'depot'
    }

    //stopped
    async function depart() {
        
        const url = `http://localhost:3030/jsonstore/bus/schedule/${stop.next}`;
        const res = await fetch(url);

        if(res.status !== 200) {
            infoBox.textContent = 'Error';
            departBtn.disabled = true;
            arriveBtn.disabled = true;
        };

        stop = await res.json();

        infoBox.textContent = `Next stop ${stop.name}`;
        departBtn.disabled = true;
        arriveBtn.disabled = false;
    }

    //moving
    function arrive() {
        
        infoBox.textContent = `Arriving at ${stop.name}`

        departBtn.disabled = false;
        arriveBtn.disabled = true;
    }

    return {
        depart,
        arrive
    };
}

let result = solve();