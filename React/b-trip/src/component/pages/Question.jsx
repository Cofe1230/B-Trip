import { useState, React } from 'react';
import {useNavigate} from 'react-router-dom';
import Swal from 'sweetalert2';
import '../styles/Question.css';
import sub from '../ui/submitbtn.png';
import pre from '../ui/prebtn.png';
import next from '../ui/nextbtn.png';

const Question = () => {
    const navigate = useNavigate()

    const questions = [
        {
        id: 1,
        text: "What's your age?", 
        options: ["20's", "30's", "40's", "50's", "over 60's"]
        },
        {
        id: 2,
        text: "Which of these categories suits you the most?", 
        options: ["Food/Gourmet Tour", "Historic/Cultural Sites/Traditional Cultural Experience", "Nature appreciation", "Shopping", "Etc"]
        },
        {
        id: 3,
        text: "What's your estimated daily travel budget per person?",
        options: ["~ 100$", "100$ ~ 200$", "200$ ~ 300$", "300$ ~"]
        },
        {
        id: 4,
        text: "When are you planning to visit?",
        options: ["Spring", "Summer", "Autumn", "Winter"]
        }
    ];

    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [userAnswers, setUserAnswers] = useState([]);

    // 답변 저장
    const handleOptionChange = (e) => {
        const selectedOption = e.target.value;
        setUserAnswers((userAnswers) => {
            let newAnswers = { ...userAnswers };
            newAnswers[currentQuestion] = selectedOption;
            return newAnswers;
        });
    };

    // 이전 질문으로 이동
    const q_prev = () => {
        if(currentQuestion > 0)
        setCurrentQuestion(currentQuestion-1)
    }

    // 다음 질문으로 이동
    const q_next = () => {
        if(!userAnswers[currentQuestion]){
            Swal.fire({ 
                text: 'Please answer the question!',
                color: '#00000080' ,
                icon: 'warning',
                iconColor: '#ffc600',
                confirmButtonText: 'OK',
                confirmButtonColor: '#ffc600',
                background: '#ffffff'
            })
        }else if(currentQuestion < 3)
        setCurrentQuestion(currentQuestion+1)
    }

    // 답변 완료 후 제출
    const submit = () => {
        if(!userAnswers[3]){
            Swal.fire({ 
                text: 'Please answer the question!',
                color: '#00000080' ,
                icon: 'warning',
                iconColor: '#ffc600',
                confirmButtonText: 'OK',
                confirmButtonColor: '#ffc600',
                background: '#ffffff'
            })
        }
        else{
            const result = {
                question1: userAnswers[0],
                question2: userAnswers[1],
                question3: userAnswers[2],
                question4: userAnswers[3]
            }
            navigate('/result',{state: {result}})
        }
    }

    return(
        <div className='questionboard'>
            <p className='qTitle'>{questions[currentQuestion].text}</p>
            <form>
                {/* {questions[currentQuestion].imgs.map((img, index) => (
                        <img key={index} src={img} alt='images' width='10px' />
                ))}
                <br/> */}
                {questions[currentQuestion].options.map((option, index) => (
                <label key={index}>
                    <input 
                    className='qRadio'
                    type="radio"
                    value={option}
                    checked={userAnswers[currentQuestion] === option}
                    onChange={handleOptionChange}
                    />
                    {option}
                </label>
                ))}
            </form>
            {
            currentQuestion !==0 && <img className='btns' src={pre} onClick={q_prev} alt='previous'/>
            }
            {
            currentQuestion !==3 && <img className='btns' src={next} onClick={q_next} alt='next' />
            }
            {
            currentQuestion ===3 && <img className='btns' src={sub} onClick={submit} alt='submit' />
            }
        </div>
    )
}

export default Question;