
import React, { useState } from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import Input from '../components/input';

const CourseTable = () => {

  const [courses, setCourses] = useState([]);
  const [courseName, setCourseName] = useState('');
  const [summarize, setSummarize] = useState('');

  const [chapterTitle, setChapterTitle] = useState('');
  const [chapterNotes, setChapterNotes] = useState('');
  const [chapterCounts, setChapterCounts] = useState([]);
  const [chapterNotesList, setChapterNotesList] = useState([]);

  const [lessionName, setLessionName] = useState('');
  const [lessionDescription, setLessionDescription] = useState('');
  const [chapters,setChapters] = useState([])
  const [lessions,setLessions] = useState([])

  const [frameChapter, setFrameChapter] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  const [btDone, setBtDone] = useState(false);

  const handleAddCourse = () => {
    // if (courseName && summarize) {
      if (editIndex !== null) {
        
        const updatedCourses = [...courses];
        updatedCourses[editIndex] = {
          name: courseName,
          summarize: summarize,
          chapters: courses[editIndex].chapters || [],
        };

        setCourses(updatedCourses);
        setEditIndex(null);
      } else {

        setCourses([
          ...courses,
          {
            name: courseName,
            summarize: summarize,
            chapters: [],
          },
        ]);
      }

      setChapterTitle([]);
      setChapterNotesList([]);
      setChapters([]);
      setFrameChapter(false);

      setLessionName([]);
      setLessionDescription([]);
      setChapterNotesList([]);
      
      setCourseName('');
      setSummarize('');


    // } else {
    //   alert('Please enter course details.');
    // }
  };
  const onAddChapter = () => {

    const id = chapters.length

    const updatedCounts = [...chapterCounts];
    updatedCounts[editIndex !== null ? editIndex : courses.length] =
      (updatedCounts[editIndex !== null ? editIndex : courses.length] || 0) + 1;

    setChapterCounts(updatedCounts);    
    console.log(updatedCounts)
    setChapters([...chapters, id]);
    setChapterTitle([...chapterTitle, '']); 
    setChapterNotes([...chapterNotes, '']); 
    setFrameChapter(true);
    setBtDone(true)

  }

  const onAddLession = (chapterIndex) => {

    const newLesson = {
      chapterIndex: chapterIndex,

    };  
    setLessions([...lessions,newLesson]);
    setLessionName([...lessionName, '']);
    setLessionDescription([...lessionDescription, '']);
    setChapterNotesList([...chapterNotesList, '']);

  }

  const handleEdit = (index) => {
    const courseToEdit = courses[index];
    setCourseName(courseToEdit.name);
    setSummarize(courseToEdit.summarize);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    const updatedCourses = [...courses];
    updatedCourses.splice(index, 1);
    setCourses(updatedCourses);
  };

  const handleCancel = () => {

    setChapterTitle([]);
    setChapterNotesList([]);
    setChapters([]);
    setFrameChapter(false);
    setLessionName([]);
    setLessionDescription([]);
    setChapterNotesList([]);
    setChapterCounts([]);

  };

  const handleClose = () => {

    setCourseName('');
    setSummarize('');
    setChapterTitle([]);
    setChapterNotesList([]);
    setChapters([]);
    setFrameChapter(false);
    setLessionName([]);
    setLessionDescription([]);
    setChapterNotesList([]);
    setBtDone(false);

  };

  const handleBtnDone = () => {

    setChapterTitle([]);
    setChapterNotesList([]);
    setChapters([]);
    setLessionName([]);
    setLessionDescription([]);
    setChapterNotesList([]);
    setFrameChapter(false);
    setBtDone(false);
  };

  const handleBtnCancelChapter = (chapterIndex) => {

  };

  return (
    <div className='justify-center'>

      <h1 className='text-3xl my-5 font-sans'>Add Courses</h1>
      
      <div className="relative " >

      <Popup className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 "
        position={'center'}
        modal 
        trigger={<button className="bg-blue-500 text-white px-10 py-3 rounded-md w-[100px] float-end mr-[65px] mb-5">

          Add</button>} closeOnDocumentClick={false}>
          {(close) => (

          <div className='justify-center pl-2'>

            <button className="w-7 h-7 rounded-full bg-gray-500 hover:bg-red-500 text-white" 
              onClick={() => {
                handleClose(); close()
              }}>
              &times;
            </button>

            <div className="popup_inner overflow-y-scroll h-[600px] pr-2">

              <h2 className="text-center font-bold text-blue-500 text-2xl" >{editIndex !== null ? 'Edit Course' : 'Add Course'}</h2>

              <Input label={'Name:'} value={courseName} onSet={setCourseName}/>

              <Input label={"Summarize:"} value={summarize} onSet={setSummarize} />

              <div className="flex items-center content-start justify-start space-x-1">
                <label> Chapters </label>
                
                <button className="bg-gray-400 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-md my-3" 
                onClick={ onAddChapter }>+ Chapter</button>
              </div>

                <div className={`${frameChapter && chapters.length > 0 ? 'border border border-black-300 pb-14 pt-5 my-3' : ''}`}>
                {
                  chapters.map((chapter, chapterIndex) => (
                    <div key={chapterIndex} className='px-4 m-auto'>
  
                      <button className = "w-7 h-7 rounded-full bg-gray-400 text-white ml-2 float-end my-2 text-xl" 

                        onClick={() => {
                          // handleBtnCancelChapter(chapterIndex)
                          }}> - </button>

                      <Input
                        label={'Title:'}
                        value={chapterTitle[chapterIndex] || ''}
                        onSet={(newValue) => {
                          const updatedTitles = [...chapterTitle];
                          updatedTitles[chapterIndex] = newValue;
                          setChapterTitle(updatedTitles);
                        }}
                      />
                      <Input
                        label={'Notes:'}
                        value={chapterNotesList[chapterIndex] || ''}
                        onSet={(newValue) => {
                          const updatedNotes = [...chapterNotesList];
                          updatedNotes[chapterIndex] = newValue;
                          setChapterNotesList(updatedNotes);
                        }}
                      />
             
                      <div className="flex items-center justify-start content-start space-x-1">
                        <label> Lessons </label>
                        <button
                          className="bg-gray-400 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-md"
                          onClick={() => onAddLession(chapterIndex)}>
                          + Lesson
                        </button>
                      </div>

                        {lessions.map((lesson, lessonIndex) => {
                          if (lesson.chapterIndex === chapterIndex) {
                            return (
                              <div key={lessonIndex} className='px-6 m-auto'>

                                <button className = "w-7 h-7 rounded-full bg-gray-400 text-white ml-2 float-end my-2 text-xl" 
                                  onClick={()=>[]}> - </button>

                                <Input
                                  label={'Lesson name:'}
                                  value={lessionName[lessonIndex]|| ''}
                                  onSet={(newValue) => {
                                    const updatedNames = [...lessionName];
                                    updatedNames[lessonIndex] = newValue;
                                    setLessionName(updatedNames);
                                  }}
                                />
                                <Input
                                  label={'Description:'}
                                  value={lessionDescription[lessonIndex]|| ''}
                                  onSet={(newValue) => {
                                    const updatedDescriptions = [...lessionDescription];
                                    updatedDescriptions[lessonIndex] = newValue;
                                    setLessionDescription(updatedDescriptions);
                                  }}
                                />  

                              </div>
                            );
                          }
                          return null;
                        })
                      }
                      
                    </div>
                  )) 
                }
                
                {
                  chapters.length > 0 && (
                    <button
                  className={`${btDone ? "bg-gray-300 hover:bg-blue-400 text-gray-800 font-bold py-2 mr-4 mb-2 mt-2 w-[80px] float-end rounded-l" : ""}`}
                  onClick={handleBtnDone}>
                  {`${btDone? "Done":''}`}
                </button>
                  )
                }

              </div>
              
              <div className='my-4 space-x-4 '>
                <button
                  className="bg-gray-300 hover:bg-blue-400 text-gray-800 font-bold py-2 px-4 rounded-l "
                  onClick={() => {
                    handleAddCourse();
                    close();}}>
                  {editIndex !== null ? 'Update Course' : 'Add Course'}
                </button>

                <button
                  className="bg-gray-300 hover:bg-blue-400 text-gray-800 font-bold py-2 px-4 rounded-l"
                  onClick={() => {handleCancel();close()}}>
                  Cancel
                </button>
              </div>

            </div>
          </div>
        )}
      </Popup>
      </div>

      <div className="w-full flex items-center justify-center">

        <table  className="table-auto mx-auto text-sm text-left rtl:text-right text-black-200 dark:text-black-200">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Summarize</th>
              <th scope="col">Chapters</th>
              <th scope="col">Action</th>
            </tr>
          </thead>

          <tbody>
            {courses.map((course, index) =>(
              
              <tr key={index}>
                <td className='border border-gray-700'>{course.name}</td>
                <td className='border border-gray-700'>{course.summarize}</td>
                <td className='border border-gray-700'>{chapterCounts[index] || 0}</td>
                <td className='border border-gray-700'>
                  <button onClick={() => handleEdit(index)}>Edit /</button>
                  <button onClick={() => handleDelete(index)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CourseTable;