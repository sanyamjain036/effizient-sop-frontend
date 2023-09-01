import { useEffect, useState } from 'react'
import Input from './components/Input'
import TextArea from './components/TextArea';
import { getHLE, registerForm } from './API';
import Toast from './components/Toast/Toast';

const DEFAULT_FORM = {
  fullname: "",
  email: "",
  age: "", //num
  highestLevelOfEducation: "",
  institueForHLE: "",
  course: "",
  workexp: "",
  canadaInstitueName: "",
  canadaInstitueCourse: "",
  originCountry: "",
  futureGoals: "",
  englishScoresListening: "", //num
  englishScoresWriting: "", //num
  englishScoresReading: "", //num
  englishScoresSpeaking: "", //num
  tuitionFeeStatus: false, //bool
  tuitionFee: "", //num
  gicStatus: false, //bool
  gicFee: "" //num
}

function App() {
  const [formData, setFormData] = useState({ ...DEFAULT_FORM });
  const [toastState, setToastState] = useState(false);
  const [errorState, setErrorState] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [highestLevelOfEducationOptions, setHighestLevelOfEducationOptions] = useState([]);

  const handleChangeForm = (e) => {
    setFormData(prev => {
      const newData = { ...prev };

      let value = e.target.value;
      let name = e.target.name;

      if (name === "tuitionFeeStatus" || name === "gicStatus") {
        value = (value === "true");
        if (value === false && name === "tuitionFeeStatus") newData.tuitionFee = 0;
        if (value === false && name === "gicStatus") newData.gicFee = 0;
      }

      else if (name === "englishScoresListening" || name === "englishScoresWriting" || name === "englishScoresReading" || name === "englishScoresSpeaking" || name === 'age' || name === 'tuitionFee' || name === 'gicFee') value = +value;

      newData[name] = value;

      return newData;
    })
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const res = await registerForm(formData);

      setToastMessage(res.data.message);
      setToastState(true);
      setErrorState(false);

      setTimeout(() => {
        setToastState(false);
        setToastMessage("");
        setErrorState(false);
      }, 4000)

      setFormData(DEFAULT_FORM);
    }
    catch (err) {
      console.log(err.response.data.message);
      setErrorState(true);
      setToastState(true);
      setToastMessage(err.response.data.message);
      setTimeout(() => {
        setToastState(false);
        setToastMessage("");
        setErrorState(false);
      }, 4000)

    }
  }

  useEffect(() => {
    async function getHleOptions() {
      try {
        const res = await getHLE();
        setHighestLevelOfEducationOptions(res.data.map(item => {
          return {
            value: item._id,
            text: item.edu
          }
        }));
      } catch (err) {
        console.log(err.message);
      }
    }
    getHleOptions();
  }, [])

  return (
    <>
      <div className='w-3/4 mx-auto py-8'>
        <h1 className='text-center text-3xl	'>Effizient Immigration Inc.</h1>
        <h1 className='text-center text-l text-slate-600	mt-4'>Get Customizable SOP on your Email!</h1>
        <section className=' my-12'>
          <form onSubmit={handleSubmit}>
            <div className='grid gap-4 md:grid-cols-2 mb-6'>
              <Input
                name='fullname'
                title='Full Name'
                type='text'
                isError={false}
                errorMessage=""
                value={formData.fullname}
                placeholder="John"
                handleChange={handleChangeForm}
              />
              <Input
                name='email'
                title='Email'
                type='email'
                isError={false}
                errorMessage=""
                value={formData.email}
                placeholder="john@gmail.com"
                handleChange={handleChangeForm}
              />
              <Input
                name='age'
                title='Age'
                type='number'
                isError={false}
                errorMessage=""
                value={formData.age}
                placeholder={21}
                handleChange={handleChangeForm}
              />
              <div>
                <label htmlFor="highestLevelOfEducation" className="block mb-2 text-sm font-medium text-gray-900">Highest Level of Education  <span className='text-red-600'>*</span></label>
                <select defaultValue="" onChange={handleChangeForm} name="highestLevelOfEducation" id="highestLevelOfEducation" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                  <option value="">Choose a Option</option>
                  {
                    highestLevelOfEducationOptions.map(item => {
                      return (<option key={item.value} value={item.value}>{item.text}</option>)
                    })
                  }
                </select>
                {/* <p className="mt-2 text-sm text-red-600"><span className="font-medium">Oh, snapp!</span> Some error message.</p> */}
              </div>
              <Input
                name='institueForHLE'
                title='Institute where you completed your highest level of education'
                type='text'
                isError={false}
                errorMessage=""
                value={formData.institueForHLE}
                placeholder={""}
                handleChange={handleChangeForm}
              />
              <Input
                name='course'
                title='What did you study'
                type='text'
                isError={false}
                errorMessage=""
                value={formData.course}
                placeholder={""}
                handleChange={handleChangeForm}
              />
            </div>
            <div>
              <TextArea
                name='workexp'
                title='Do you have any relevant work experience?'
                helpertext={`
                Write None if no work experience. Provide the following details if yes:
                1. Job Title 
                2. Company Name 
                3. Job duties
                `}
                isError={false}
                errorMessage=""
                value={formData.workexp}
                placeholder={`I worked as a Sales Manager at Effizient Immigration Inc from Jan 2022 till Feb 2023. In this role, I managed sales operations, reaching out to leads, lead the outreach program, ensured meeting monthly targets.`}
                handleChange={handleChangeForm}
              />
            </div>
            <div>
              <TextArea
                name='futureGoals'
                title='What are your future goals?'
                helpertext={""}
                isError={false}
                errorMessage=""
                value={formData.futureGoals}
                placeholder={""}
                handleChange={handleChangeForm}
              />
            </div>
            <div className='grid gap-4 md:grid-cols-2 mb-6'>
              <Input
                name='canadaInstitueName'
                title='What institute did you get admitted to in Canada?'
                type='text'
                isError={false}
                errorMessage=""
                value={formData.canadaInstitueName}
                placeholder={""}
                handleChange={handleChangeForm}
              />
              <Input
                name='canadaInstitueCourse'
                title='What is your program of study in Canada?'
                type='text'
                isError={false}
                errorMessage=""
                value={formData.canadaInstitueCourse}
                placeholder={""}
                handleChange={handleChangeForm}
              />
              <Input
                name='originCountry'
                title='Which country are you applying from?'
                type='text'
                isError={false}
                errorMessage=""
                value={formData.originCountry}
                placeholder={""}
                handleChange={handleChangeForm}
              />
            </div>
            <div className='grid gap-4 md:grid-cols-2 mb-6'>
              <Input
                name='englishScoresListening'
                title='English Scores - Listening'
                type='number'
                isError={false}
                errorMessage=""
                value={formData.englishScoresListening}
                placeholder={""}
                handleChange={handleChangeForm}
              />
              <Input
                name='englishScoresReading'
                title='English Scores - Reading'
                type='number'
                isError={false}
                errorMessage=""
                value={formData.englishScoresReading}
                placeholder={""}
                handleChange={handleChangeForm}
              />
              <Input
                name='englishScoresSpeaking'
                title='English Scores - Speaking'
                type='number'
                isError={false}
                errorMessage=""
                value={formData.englishScoresSpeaking}
                placeholder={""}
                handleChange={handleChangeForm}
              />
              <Input
                name='englishScoresWriting'
                title='English Scores - Writing'
                type='number'
                isError={false}
                errorMessage=""
                value={formData.englishScoresWriting}
                placeholder={""}
                handleChange={handleChangeForm}
              />
            </div>
            <div className='flex flex-col justify-start gap-6 items-center mb-6 md:flex-row'>
              <p className="block text-sm font-medium text-gray-900"> Did you pay your first year tuition? <span className='text-red-600'>*</span></p>
              <div className='flex gap-6 items-center'>
                <div className="flex items-center px-4 border border-gray-200 rounded ">
                  <input id="tuitionFeeStatus-false" checked={formData.tuitionFeeStatus === false} onChange={handleChangeForm} type="radio" value={false} name="tuitionFeeStatus" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 cursor-pointer" />
                  <label htmlFor="tuitionFeeStatus-false" className="w-full py-4 ml-2 text-sm font-medium text-gray-900 cursor-pointer">False</label>
                </div>
                <div className="flex items-center px-4 border border-gray-200 rounded  ">
                  <input id="tuitionFeeStatus-true" checked={formData.tuitionFeeStatus === true} onChange={handleChangeForm} type="radio" value={true} name="tuitionFeeStatus" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 cursor-pointer " />
                  <label htmlFor="tuitionFeeStatus-true" className="w-full py-4 ml-2 text-sm font-medium text-gray-900 cursor-pointer">True</label>
                </div>
              </div>
              {
                formData.tuitionFeeStatus === true ?
                  <Input
                    name='tuitionFee'
                    title='How much tuition fee did you pay?'
                    type='number'
                    isError={false}
                    errorMessage=""
                    value={formData.tuitionFee}
                    placeholder={""}
                    handleChange={handleChangeForm}
                  /> : null
              }
            </div>
            <div className='flex flex-col justify-start gap-6 items-center mb-6 md:flex-row'>
              <p className="block text-sm font-medium text-gray-900">Did you do a GIC?<span className='text-red-600'>*</span></p>
              <div className='flex gap-6 items-center'>
                <div className="flex items-center px-4 border border-gray-200 rounded ">
                  <input id="gicStatus-false" checked={formData.gicStatus === false} onChange={handleChangeForm} type="radio" value={false} name="gicStatus" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 cursor-pointer" />
                  <label htmlFor="gicStatus-false" className="w-full py-4 ml-2 text-sm font-medium text-gray-900 cursor-pointer">False</label>
                </div>
                <div className="flex items-center px-4 border border-gray-200 rounded ">
                  <input id="gicStatus-true" checked={formData.gicStatus === true} onChange={handleChangeForm} type="radio" value={true} name="gicStatus" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 cursor-pointer " />
                  <label htmlFor="gicStatus-true" className="w-full py-4 ml-2 text-sm font-medium text-gray-900 cursor-pointer">True</label>
                </div>
              </div>
              {
                formData.gicStatus === true ?
                  <Input
                    name='gicFee'
                    title='How much did you pay towards GIC?'
                    type='number'
                    isError={false}
                    errorMessage=""
                    value={formData.gicFee}
                    placeholder={""}
                    handleChange={handleChangeForm}
                  /> : null
              }
            </div>
            <div className='text-center'>
              <button type="submit" className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Submit</button>
            </div>
          </form>
        </section>
        <Toast
          open={toastState}
          positon="topRight"
          message={toastMessage}
          errorState={errorState}
        />
      </div>
    </>
  )
}

export default App
