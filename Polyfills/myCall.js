let cap = {
    name: "Steve",
    team: "cap",
    petersTeam: function (mem1, mem2) {
        console.log(`Hey ${this.name} am your neighborhood spiderman and I belong to ${this.team}'s team with members ${mem1} and ${mem2}`);
    }
}
let ironMan = {
    name: "Tony",
    team: "iron man"
}


cap.petersTeam.call(ironMan, 'Thor', 'Captain America');

Function.prototype.myCall = function (passedObj, ...args) {

    let ref = this;
    passedObj.customCall = ref;

    passedObj.customCall(...args);

    delete passedObj.customCall;


}

cap.petersTeam.myCall(ironMan, 'anshu', 'sagar');