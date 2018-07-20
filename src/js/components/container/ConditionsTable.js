import React, {Component} from "react"
const pubmedUrl = 'https://www.ncbi.nlm.nih.gov/pubmed/?term='

class ConditionsTable extends Component {
    constructor(props){
        super(props);
        this.state = {
            patientNo:this.props.patientNo,
            conditions:[]
        }
        this.fetchConditons = this.fetchConditons.bind(this);
        this.sortTableByDate= this.sortTableByDate.bind(this);
        this.sortTableByName= this.sortTableByName.bind(this);

    }
    componentWillMount(){
        this.fetchConditons(this.state.patientNo);
    }
    fetchConditons(patientNo){

        let conditions;
        fetch('https://fhir-open.sandboxcerner.com/dstu2/0b8a0111-e8e6-4c26-a91c-5069cbc6b1ca/Condition'+'?patient='+patientNo, {
            method: 'GET',
            headers: {
                'Accept': 'application/json+fhir'
            }
        }).then(response=>{
            return response.json();
        }).then(json => {
            conditions = json.entry;
            console.log(conditions);
            this.setState({conditions:conditions});
        }).catch(error =>{
            console.log(error);
        })
    };
    sortTableByDate(){
        let sortedConditions = this.state.conditions.sort( (a,b) =>{
            let aDate =new Date(a.resource['dateRecorded']);
            let bDate = new Date(b.resource['dateRecorded']);
            return aDate - bDate;
            // if(aDate < bDate) return -1;
            // if(aDate> bDate) return 1;
            // return 0
        });
        this.setState({conditions: sortedConditions});
    }
    sortTableByName(){
        let sortedConditions = this.state.conditions.sort( (a,b) =>{
            if(a.resource.code.text < b.resource.code.text) return -1;
            if(a.resource.code.text > b.resource.code.text) return 1;
            return 0
        });
        this.setState({conditions: sortedConditions});
    }

    render(){
        return (
            <div>
                  some times the data takes a while to load
                <div style={{display:'flex',flexDirection:'row'}}>
                    <div style={{flexGrow:1,alignSelf:'flex-end'}}>
                        <button onClick={this.sortTableByName} type="button" className="btn btn-light">sort by Name</button></div>
                    <div style={{flexGrow:1,alignSelf:'flex-end',textAlign:'right'}}>
                        <button onClick={this.sortTableByDate} type="button" className="btn btn-light">sort by Date</button>
                    </div>
                </div>
                <ul>
                    {this.state.conditions.map(condition => (
                        <li key={condition.resource.id} style={{display:'flex',flexDirection:'row'}}>
                            <div style={{flexGrow:1,alignSelf:'flex-end'}}> <a href={pubmedUrl+condition.resource.code.text}>{condition.resource.code.text}</a></div>
                               <div style={{flexGrow:1,alignSelf:'flex-end',textAlign:'right'}}>{condition.resource.dateRecorded}</div>
                        </li>
                    ))}
                </ul>
            </div>
        )
    }
}

export default ConditionsTable;