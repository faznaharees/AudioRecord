import React, { Component } from 'react'
import MicRecorder from 'mic-recorder-to-mp3';
import {db} from './Firebase'

const Mp3Recorder = new MicRecorder({ bitRate: 128 });



export default class Recording extends Component {
    constructor(props){
        super(props)
        this.state = {
            isRecording: false,
            blobURL: '',
            isBlocked: false,
            answer:'',
            count:0,
            timer:false
          }
    }
    componentDidMount(){
        navigator.getUserMedia({ audio: true },
            () => {
              console.log('Permission Granted');
              this.setState({ isBlocked: false });
            },
            () => {
              console.log('Permission Denied');
              this.setState({ isBlocked: true })
            },
          );
          
    }
    start = (e) => {
        e.preventDefault();
        if (this.state.isBlocked) {
          console.log('Permission Denied');
        } else {
          Mp3Recorder
            .start()
            .then(() => {
              this.setState({ isRecording: true ,timer:true});
            }).catch((e) => console.error(e));
        }
        this.doIntervalChange();
      };
      stop = (e) => {
          e.preventDefault();
        Mp3Recorder
          .stop()
          .getMp3()
          .then(([buffer, blob]) => {
            const blobURL = URL.createObjectURL(blob)
            this.setState({ blobURL, isRecording: false ,timer:false});
          }).catch((e) => console.log(e));
          console.log("Recording stopped")
      };
      Change1 = (e) => {
        this.setState({
            answer:e.target.value
        })
      }
      handleSubmit = (e) => {
        e.preventDefault();
        console.log(this.state.answer)
        db.collection('record').add({
            text:this.state.answer,
            audio:this.state.blobURL
        })
        this.setState({
            a:'',
            blobURL:'',count:0
        })
      }
      
      doIntervalChange(){this.myInterval = setInterval(()=>{
       
        this.setState(prevState => ({
            count: (this.state.timer) ? (prevState.count+1) : prevState.count
        }))
    },1000)}

    render() {
        let button;
        if(!this.state.isRecording)
            button = <i onClick={this.start} className="material-icons green-text">mic</i>  
        else
            button =  <i onClick={this.stop} className="material-icons red-text">mic</i>   
        return (
            <form>
                    <textarea className="textarea" placeholder="Type your answer..." value={this.state.a} onChange={this.Change1}/>
                    <br/>
                    <div className="" style={{display:"flex",width:"350px"}}>
                    <audio src={this.state.blobURL} controls="controls" />
                       {/* <i className="material-icons" height="30px">mic</i>  */}

                        <div style={{marginLeft:"0px"}} >
                   
                    {button}
                    
                     
               </div>
                    </div>
                   <br/>
                   
                    <br/>
                    <div className="" style={{display:"flex",width:"350px"}}>
                    Recorded {this.state.count}s  <button onClick={this.handleSubmit} style={{marginLeft:"230px"}} className="submit">SUBMIT</button>
                    </div>
            </form>
        )
    }
}
