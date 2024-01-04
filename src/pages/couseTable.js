
import React, { useState } from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import Input from '../components/input';

const CourseTable = () => {
  const [courseName, setCourseName] = useState('');
  const [summarize, setSummarize] = useState('');
  const [totalChapter, setTotalChapter] = useState('');
  const [courses, setCourses] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [chapterTitle, setChapterTitle] = useState('');
  const [chapterNotes, setChapterNotes] = useState('');
  const [lessionName, setLessionName] = useState('');
  const [chapterNotesList, setChapterNotesList] = useState([]);
  const [lessionDescription, setLessionDescription] = useState('');
  // const [showChapterFields, setShowChapterFields] = useState(false);
  // const [showLessionFields, setshowLessionField] = useState(false);

  const [chapters,setChapters] = useState([])

  const [lessions,setLessions] = useState([])


  const onAddChapter = () => {

    const id = chapters.length

    setChapters([...chapters, id]);
    setChapterTitle([...chapterTitle, '']); 
    setChapterNotes([...chapterNotes, '']); 

  }

  const onAddLession = (chapterIndex) => {

    const newLesson = {
      chapterIndex: chapterIndex,

    };  
    setLessions([...lessions,newLesson]);
    setLessionName([...lessionName, '']);
    setLessionDescription([...lessionDescription,''])
  }
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

      setCourseName('');
      setSummarize('');
      setTotalChapter('');
    // } else {
    //   alert('Please enter course details.');
    // }
  };

  const handleEdit = (index) => {
    const courseToEdit = courses[index];
    setCourseName(courseToEdit.name);
    setSummarize(courseToEdit.summarize);
    setTotalChapter(courseToEdit.chapters.length);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    const updatedCourses = [...courses];
    updatedCourses.splice(index, 1);
    setCourses(updatedCourses);
  };



  return (
    <div className='center'>
      <h1>Courses</h1>
      
      <div className="relative " >
      <Popup className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 "
        position={'center'}
        modal 
        trigger={<button className="bg-blue-500 text-white px-4 py-2 rounded-md absolute top-0 right-0 mt-4 mr-10 ">Add</button>} closeOnDocumentClick={false}>
          {(close) => (

          <div >
            <button className="w-7 h-7 rounded-full bg-gray-500 hover:bg-red-500 text-white" 
              onClick={close}>
              &times;
            </button>

            <div className="popup_inner overflow-y-scroll h-[600px]">

              <h2>{editIndex !== null ? 'Edit Course' : 'Add Course'}</h2>

              <Input label={'Name:'} value={courseName} onSet={setCourseName}/>

              <Input label={"Summarize:"} value={summarize} onSet={setSummarize} />

              <div className="flex items-center justify-between">
                <label>Total Chapters {totalChapter}</label>
                
                <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l" onClick={ onAddChapter }>+ Chapter</button>
              </div>

                <div>
                {
                  chapters.map((chapter, chapterIndex) => (
                    <div key={chapterIndex}>
                      <Input
                        label={'Title:'}
                        value={chapterTitle[chapterIndex]}
                        onSet={(newValue) => {
                          const updatedTitles = [...chapterTitle];
                          updatedTitles[chapterIndex] = newValue;
                          setChapterTitle(updatedTitles);
                        }}
                      />
                      <Input
                        label={'Notes:'}
                        value={chapterNotesList[chapterIndex]}
                        onSet={(newValue) => {
                          const updatedNotes = [...chapterNotesList];
                          updatedNotes[chapterIndex] = newValue;
                          setChapterNotesList(updatedNotes);
                        }}
                      />

                      <div className="flex items-center justify-between">
                        <label>Lessons</label>
                        <button
                          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l"
                          onClick={() => onAddLession(chapterIndex)}>
                          + Lesson
                        </button>
                      </div>

                      {lessions.map((lesson, lessonIndex) => {
                        if (lesson.chapterIndex === chapterIndex) {
                          return (
                            <div key={lessonIndex} className='w-[400px] m-auto'>
                              <Input
                                label={'Lesson name:'}
                                value={lessionName[lessonIndex]}
                                onSet={(newValue) => {
                                  const updatedNames = [...lessionName];
                                  updatedNames[lessonIndex] = newValue;
                                  setLessionName(updatedNames);
                                }}
                              />
                              <Input
                                label={'Description:'}
                                value={lessionDescription[lessonIndex]}
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
                      })}
                    </div>
                  ))
                }

                {/* {
                  chapters.map((chapter, index) => (
                    <div key={index}>
                      <Input
                        label={'Title:'}
                        value={chapterTitle[index]}
                        onSet={(newValue) => {
                          const updatedTitles = [...chapterTitle];
                          updatedTitles[index] = newValue;
                          setChapterTitle(updatedTitles);
                        }}
                      />
                      <Input
                        label={'Notes:'}
                        value={chapterNotesList[index]}
                        onSet={(newValue) => {
                          const updatedNotes = [...chapterNotesList];
                          updatedNotes[index] = newValue;
                          setChapterNotesList(updatedNotes);
                        }}
                      />

                      <div className="flex items-center justify-between">
                        <label>Lession</label>
                        <button
                          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l"
                          onClick={onAddLession}>
                          + Lession
                        </button>
                      </div>
                      {
                        lessions.map((lession, index) => (
                          <div key={index} className='w-[400px] m-auto'>
                            <Input
                              label={'Lesson name:'}
                              value={lessionName[index]}
                              onSet={(newValue) => {
                                const updatedNames = [...lessionName];
                                updatedNames[index] = newValue;
                                setLessionName(updatedNames);
                              }}
                            />
                            <Input
                              label={'Description:'}
                              value={lessionDescription[index]}
                              onSet={(newValue) => {
                                const updatedDescriptions = [...lessionDescription];
                                updatedDescriptions[index] = newValue;
                                setLessionDescription(updatedDescriptions);
                              }}
                            />
                           
                          </div>
                        ))
                      }
                    </div>
                  ))
                } */}

                  {/* {
                    chapters.map(chapter => {
                      return(
                        <div>
                          <Input label={'Title:'} value={chapterTitle} onSet={setChapterTitle} />
                          <Input label={'Notes:'} value={chapterNotes} onSet={setChapterNotes} />

                          <div className="flex items-center justify-between">
                          <label>Lession</label>
                          <button
                            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l"
                            onClick={onAddLession}>
                            + Lession
                          </button>
                          </div>
                          {
                            lessions.map(lession => {
                              return (
                                <div className='w-[400px] m-auto'> 
                        
                                    <Input label={'Lesstion name:'} value={lessionName} onSet={setLessionName}/>
                                    <Input label={'Description:'} value={lessionDescription} onSet={setLessionDescription} />
                                    
                                </div>
                              )
                            })
                          }
                        
                        </div>
                      )
                    })
                  } */}
                </div>
              
              <div>
                <button
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l mr-2"
                  onClick={() => {
                    handleAddCourse();
                    close();}}>
                  {editIndex !== null ? 'Update Course' : 'Add Course'}
                </button>

                <button
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l"
                  onClick={close}>
                  Cancel
                </button>
              </div>

            </div>
          </div>
        )}
      </Popup>
      </div>

      <div className="w-full flex items-center justify-center">

        <table  className="table-auto border-collapse mx-auto mt-20 text-sm text-left rtl:text-right text-black-200 dark:text-black-200">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Summarize</th>
              <th scope="col">Chapters</th>
              <th scope="col">Action</th>
            </tr>
          </thead>

          <tbody>
            {courses.map((course, index) => (
              <tr key={index}>
                <td>{course.name}</td>
                <td>{course.summarize}</td>
                <td>{course.chapters.length}</td>
                <td>
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