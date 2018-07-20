import React, {Component} from "react"
import ReactDom from "react-dom"
import Input from "../presentational/Input"
import ConditionsTable from './ConditionsTable'




class DemographicsFormContainer extends Component {
    constructor(){
        super();

        this.state = {
            patientNo:"",
            demographics:[],
            message:"Please enter a patient number to see a list of sortable conditions"
        }
        this.handleChange = this.handleChange.bind(this);
        this.fetchRecords = this.fetchRecords.bind(this);
    }
    handleChange(event){
        this.setState({[event.target.id]:event.target.value})
    }
    componentDidCatch(error, info){
        this.setState({hasError:true});
    }
    fetchRecords(){
        let patientNo = this.state.patientNo;
        // if(typof patientNo != "number")
        let demographics = [];
        fetch('https://fhir-open.sandboxcerner.com/dstu2/0b8a0111-e8e6-4c26-a91c-5069cbc6b1ca/Patient'+'?_id='+patientNo, {
            method: 'GET',
            headers: {
                'Accept': 'application/json+fhir'
            }
        }).then(response=>{
            return response.json();
        }).then(json => {
            demographics = json.entry;
            console.log(demographics);
            this.setState({demographics:demographics});
        }).catch(error =>{
            console.log(error);
        })
    };

    render(){

       return(
           <div>
               <form id="patientNoForm">
                   <Input label="Patient Number" type="number" text="patient #" id="patientNo" value={this.state.patientNo} handleChange={this.handleChange}/>
               </form>
               <button type="button" className="btn btn-primary" onClick={this.fetchRecords}>Search Records</button>
               {this.state.demographics.length > 0   ? this.state.demographics.map(function(d){
                   return (
                       <div key={d.fullUrl}>
                           <div >{d.resource.name[0].given[0]} {d.resource.name[0].family[0]} {d.resource.gender} {d.resource.birthDate}</div>
                           <ConditionsTable patientNo={d.resource.id}/>
                       </div>
                   )
               }) : <div>{this.state.message}</div>}

           </div>
       )
    }
}

const wrapper = document.getElementById("create-article-form");
wrapper ? ReactDom.render(<DemographicsFormContainer/>, wrapper): false;



export default DemographicsFormContainer