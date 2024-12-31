import React, { useState, useEffect } from 'react';
import TeacherRow from './TeacherRow';
import { PlusIcon } from '@heroicons/react/20/solid';
import SertifikatPKPA from './Sertifikat';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

const dataTeacher = [
    {
        id: 1,
        uuid: '1234-12340-1234',
        name: 'John Doe',
        nik: '35730189734855',
        code: 'JD-01',
        noRegister: '21-01-0001',
        last_educations: [
            {
                id: 1,
                name: 'Bachelor of Science in Computer Science',
                institution: 'University of California, Berkeley',
                start_date: '2010-01-01',
                end_date: '2014-01-01',
                degree: 'Bachelor of Science',
                field_of_study: 'Computer Science',
                gpa: 3.5,
                description: 'This is a description of the education'
            }
        ],
        speciality: 'Hukum Arbitrase',
        description: 'Guru besar',
        focus: 'Teori Arbitrase',
        university_id: 1,
        university: { name: 'Universitas Indonesia' }
    },
    {
        id: 2,
        uuid: '1234-12340-1235',
        name: 'Hendro',
        nik: '35730189734856',
        code: 'JD-02',
        noRegister: '21-01-0002',
        last_educations: [
            {
                id: 2,
                name: 'Bachelor of Science in Computer Science',
                institution: 'University of California, Berkeley',
                start_date: '2010-01-01',
                end_date: '2014-01-01',
                degree: 'Bachelor of Science',
                field_of_study: 'Computer Science',
                gpa: 3.5,
                description: 'This is a description of the education'
            }
        ],
        speciality: 'Hukum Arbitrase',
        description: 'Guru besar',
        focus: 'Teori Arbitrase',
        university_id: 6,
        university: { name: 'Universitas Brawijaya' }
    },
    {
        id: 3,
        uuid: '1234-12340-1236',
        name: 'Jane Smith',
        nik: '35730189734857',
        code: 'JD-03',
        noRegister: '21-01-0003',
        last_educations: [
            {
                id: 3,
                name: 'Master of Arts in Education',
                institution: 'Harvard University',
                start_date: '2015-01-01',
                end_date: '2017-01-01',
                degree: 'Master of Arts',
                field_of_study: 'Education',
                gpa: 3.9,
                description: 'This is a description of the education'
            }
        ],
        speciality: 'Pendidikan',
        description: 'Dosen',
        focus: 'Metode Pembelajaran',
        university_id: 7,
        university: { name: 'Universitas Gadjah Mada' }
    },
    {
        id: 4,
        uuid: '1234-12340-1237',
        name: 'Michael Johnson',
        nik: '35730189734858',
        code: 'JD-04',
        noRegister: '21-01-0004',
        last_educations: [
            {
                id: 4,
                name: 'Doctor of Philosophy in Physics',
                institution: 'Massachusetts Institute of Technology',
                start_date: '2008-01-01',
                end_date: '2012-01-01',
                degree: 'Doctor of Philosophy',
                field_of_study: 'Physics',
                gpa: 4.0,
                description: 'This is a description of the education'
            }
        ],
        speciality: 'Fisika',
        description: 'Peneliti',
        focus: 'Teori Kuantum',
        university_id: 1,
        university: { name: 'Universitas Indonesia' }
    },
    {
        id: 5,
        uuid: '1234-12340-1238',
        name: 'Emily Davis',
        nik: '35730189734859',
        code: 'JD-05',
        noRegister: '21-01-0005',
        last_educations: [
            {
                id: 5,
                name: 'Bachelor of Arts in History',
                institution: 'Stanford University',
                start_date: '2012-01-01',
                end_date: '2016-01-01',
                degree: 'Bachelor of Arts',
                field_of_study: 'History',
                gpa: 3.8,
                description: 'This is a description of the education'
            }
        ],
        speciality: 'Sejarah',
        description: 'Pengajar',
        focus: 'Sejarah Modern',
        university_id: 2,
        university: { name: 'Universitas Pasundan' }
    }
];




export default function TenagaPengajar({ selectedUniversity, onBack}) {
    console.log("selectedUniversity di TenagaPengajar:", selectedUniversity);
    const [searchTerm, setSearchTerm] = useState('');
    const [teachers, setTeachers] = useState([]);
    const [isAddFormVisible, setIsAddFormVisible] = useState(false);
    const [isEditFormVisible, setIsEditFormVisible] = useState(false);
    const [editTeacher, setEditTeacher] = useState(null);
    const [currentStep, setCurrentStep] = useState('tenagaPengajar');

    const teacherSchema = Yup.object().shape({
        name: Yup.string().required('Nama Pengajar di perlukan'),
        nik: Yup.string().required('NIK di perlukan'),
        noRegister: Yup.string().required('No Register di perlukan'),
        speciality: Yup.string().required('Bidang Keahlian di perlukan'),
    });
    
    const TeacherForm = ({ initialValues, onSubmit, onCancel }) => (
        <Formik
            initialValues={{
                name: initialValues?.name || '',
                nik: initialValues?.nik || '',
                noRegister: initialValues?.noRegister || '',
                speciality: initialValues?.speciality || '',
                university_name: selectedUniversity?.name || ''
            }}
            validationSchema={teacherSchema}
            onSubmit={onSubmit}
            enableReinitialize={true}
        >
            {({ errors, touched }) => (
                <Form>
                    <Field name="name" placeholder="Nama Pengajar" className="mb-2 p-2 border w-full" />
                    {errors.name && touched.name ? <div className='text-red-600'>{errors.name}</div> : null}
                    <Field name="nik" placeholder="NIK" className="mb-2 p-2 border w-full" />
                    {errors.name && touched.name ? <div className='text-red-600'>{errors.nik}</div> : null}
                    <Field name="noRegister" placeholder="No Register" className="mb-2 p-2 border w-full" />
                    {errors.noRegister && touched.noRegister ? <div className='text-red-600'>{errors.noRegister}</div> : null}
                    <Field name="speciality" placeholder="Bidang Keahlian" className="mb-2 p-2 border w-full" />
                    {errors.speciality && touched.speciality ? <div className='text-red-600'>{errors.speciality}</div> : null}
                    <Field
                        name="university_name"
                        value={selectedUniversity?.name || ''}
                        disabled
                        className="mb-2 p-2 border w-full bg-gray-100 text-gray-500"
                    />
                    <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded w-full">Simpan</button>
                    <button type="button" onClick={onCancel} className="bg-gray-500 text-white px-4 py-2 rounded w-full mt-2">Batal</button>
                </Form>
            )}
        </Formik>
    );

    useEffect(() => {
        if (selectedUniversity && selectedUniversity.university_id) {
            console.log("TenagaPengajar menerima selectedUniversity:", selectedUniversity);

            const storedTeachers = localStorage.getItem('teachers') 
                ? JSON.parse(localStorage.getItem('teachers'))
                : dataTeacher;

            const filteredByUniversity = storedTeachers.filter(
                (teacher) => teacher.university_id === selectedUniversity.university_id
            );
    
            console.log("Filtered Teachers:", filteredByUniversity);
            setTeachers(filteredByUniversity);
        } else {
            console.log("No selected university or missing university_id");
        }
    }, [selectedUniversity]);
    

    const handleAddTeacher = () => {
        setEditTeacher(null);
        setIsAddFormVisible(true);
    };

    const handleSaveTeacher = (newTeacher) => {
        const updatedTeachers = [...teachers, { 
            ...newTeacher, 
            id: teachers.length + 1, 
            university_id: selectedUniversity.university_id,
            university_name: selectedUniversity.name 
        }];
        setTeachers(updatedTeachers);
        localStorage.setItem('teachers', JSON.stringify(updatedTeachers));
        setIsAddFormVisible(false);
    };

    const handleEditTeacher = (teacher) => {
        setEditTeacher(teacher);
        setIsEditFormVisible(true);
    };

    const handleUpdateTeacher = (updatedTeacher) => {
        const updatedTeachers = teachers.map((teacher) =>
            teacher.id === updatedTeacher.id 
                ? { ...updatedTeacher, university_name: selectedUniversity.name }
                : teacher
        );
        setTeachers(updatedTeachers);
        localStorage.setItem('teachers', JSON.stringify(updatedTeachers));
        setIsEditFormVisible(false);
    };

    const handleDeleteTeacher = (id) => {
        const updatedTeachers = teachers.filter((teacher) => teacher.id !== id);
        setTeachers(updatedTeachers);
        localStorage.setItem('teachers', JSON.stringify(updatedTeachers));
    };

    const filteredTeachers = teachers.filter(
        (teacher) =>
            teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            teacher.speciality.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleNextToSertifikatPKPA = () => {
        setCurrentStep('sertifikatPKPA');
    };
    const handleBackToTenagaPengajar = () => {
        setCurrentStep('tenagaPengajar');
      };

    return (
        <div className="bg-white rounded-md shadow-md relative">
            {currentStep === 'tenagaPengajar' && (
                <>
                    <h2 className="text-2xl py-8 px-5 font-extrabold">Tambah Universitas</h2>
                    <div className="text-sm font-medium text-gray-500 mb-5">
                        <div className="flex border-b-2 mb-5">
                            <div className="pb-5 px-5 mx-5">Identitas Universitas</div>
                            <div className="pb-5 px-5 mx-5 border-b-4 border-orange-300 text-orange-300">Tenaga Pengajar</div>
                            <div className="pb-5 px-5 mx-5">Sertifikat PKPA</div>
                        </div>
                    </div>
                    <div className="px-5 flex justify-between items-center mb-4">
                        <input
                            type="text"
                            placeholder="Cari"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button
                            onClick={handleAddTeacher}
                            className="bg-orange-400 text-white px-4 py-2 rounded-md hover:bg-orange-5  00 flex items-center"
                        >
                            <PlusIcon className="h-5 w-5 text-white mr-2" />
                            Tambah Pengajar
                        </button>
                    </div>
                    <div className="p-5 overflow-x-auto">
                        <table className="min-w-full border border-gray-200">
                            <thead>
                                <tr>
                                    <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-semibold text-black uppercase">No Registrasi</th>
                                    <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-semibold text-black uppercase">Nama Pengajar</th>
                                    <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-semibold text-black uppercase">Universitas</th>
                                    <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-semibold text-black uppercase">Bidang Keahlian</th>
                                    <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-semibold text-black uppercase">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {filteredTeachers.map((teacher) => (
                                    <TeacherRow 
                                        key={teacher.id} 
                                        teacher={teacher} 
                                        onEdit={() => handleEditTeacher(teacher)} 
                                        onDelete={() => handleDeleteTeacher(teacher.id)} 
                                    />
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="px-5 py-4 flex justify-between">
                    <button type="button" onClick={onBack} className="px-4 py-2 border border-gray-400 text-gray-400 rounded">Kembali</button>
                        <button
                            onClick={handleNextToSertifikatPKPA}
                            className="bg-orange-400 text-white px-4 py-2 rounded"
                        >
                            Lanjut
                        </button>
                    </div>
                    {isAddFormVisible && (
                        <div className="fixed inset-0 flex justify-end bg-black bg-opacity-25"> 
                            <div className="bg-white w-1/3 h-full p-5 mt-16 overflow-y-auto transition-transform transform duration-500 z-50">
                                <h3 className="text-lg font-bold mb-4">Tambah Pengajar</h3>
                                <TeacherForm
                                    initialValues={{
                                        name: '',
                                        nik: '',
                                        noRegister: '',
                                        speciality: '',
                                        university_name: selectedUniversity?.name || ''
                                    }}
                                    onSubmit={handleSaveTeacher}
                                    onCancel={() => setIsAddFormVisible(false)}
                                />
                            </div>
                        </div>
                    )}
                    {isEditFormVisible && editTeacher && (
                        <div className="fixed inset-0 flex justify-end bg-black bg-opacity-25"> 
                            <div className="bg-white w-1/3 h-full p-5 mt-16 overflow-y-auto transition-transform transform duration-500 z-50">
                                <h3 className="text-lg font-bold mb-4">Edit Pengajar</h3>
                                <TeacherForm
                                    initialValues={editTeacher}
                                    onSubmit={(values) => handleUpdateTeacher({ ...editTeacher, ...values })}
                                    onCancel={() => setIsEditFormVisible(false)}
                                />
                            </div>
                        </div>
                    )}
                </>
            )}

            {currentStep === 'sertifikatPKPA' && <SertifikatPKPA onBack={handleBackToTenagaPengajar}/>}
        </div>
    );
}
