import React from 'react'
function renderName(contactArr){
    names = contactArr.reduce((names,contact) => {
        names.push(contact.name);
    },[]);
    const patientNames = names.map((name, i) =>{
        names.map( refName => {
            if(refName == name) names.splice(i,1);
        })
        return (
            <h5>{name}</h5>
        )
    })


}
const PatientDemoGraphicsCard = (props) => (
        <div className="card">
                <div className="card-body">
                    {/*{patientNames(props.contact)}*/}
                    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    <a href="#" className="btn btn-primary">Go somewhere</a>
                </div>
        </div>
    )


export default PatientDemoGraphicsCard;