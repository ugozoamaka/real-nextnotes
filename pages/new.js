import Link from 'next/link';
import { useState, useEffect } from 'react';
import fetch from 'isomorphic-unfetch';
import { Button, Form, Loader } from 'semantic-ui-react';
import { useRouter } from 'next/dist/client/router';

const NewNote = ()=>{
    const [form, setForm] = useState({title: {}, description: {}});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors ] = useState({})
    const router = useRouter;

    const createNote = async () => {
        try {
            const res = await fetch('http://localhost:3000/api/notes', {
                method: 'POST',
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(form)
            })
            router.push("/");
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if(isSubmitting){
            if(Object.keys(errors).length === 0){
                createNote()
               
            }
        }else{
            setIsSubmitting(false)
        }
    }, [errors])

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }


    const handleSubmit = (e) => {
        e.preventDefault();
        let errs = validate();
        setErrors(errs);
        setIsSubmitting(true);
    }
    const validate = () => {
        let err = {};

        if (!form.title) {
            err.title = 'Title is required';
        }
        if (!form.description) {
            err.description = 'Description is required';
        }

        return err;
    }
    // const validate = () => {
    //     let err = {};

    //     if(!form.title){
    //         err.title = 'Title is required';
    //     }
    //     if(!form.description){
    //         err.description ='Description is required'
    //     }
    //     return err;
    // }




    return (
        <div className="form-container">
            <h1>Create Note</h1>
            <div>
                {
                    isSubmitting
                        ? <Loader active inline='centered' />
                        : <Form onSubmit={handleSubmit}>
                            <Form.Input
                                fluid
                                error={errors.title ? { content: 'Please enter a title', pointing: 'below' } : null}
                                label='Title'
                                placeholder='Title'
                                name='title'
                                onChange={handleChange}
                            />
                            <Form.TextArea
                                fluid
                                label='Descriprtion'
                                placeholder='Description'
                                name='description'
                                error={errors.description ? { content: 'Please enter a description', pointing: 'below' } : null}
                                onChange={handleChange}
                            />
                            <Button type='submit'>Create</Button>
                        </Form>
                }
            </div>
        </div>
    )



    // return (
    //     <div className="form-container">
    //         <h1>Create Note</h1>
    //         <div>
    //             {
    //                 isSubmitting
    //                     ? <Loader active inline='centered' />
    //                     : <Form onSubmit={handleSumit}>
    //                         <Form.Input
    //                             fluid
    //                             error={errors.title ? {content: 'Please Enter a Title', pointing: below}: null}
    //                             label='Title'
    //                             placeholder='Title'
    //                             name='title'
    //                             onChange={handleChange}
    //                         />
    //                         <Form.TextArea
    //                             fluid
    //                             error={errors.description ? { content: 'Please enter a description', pointing: 'below' } : null}
    //                             label='Descriprtion'
    //                             placeholder='Description'
    //                             name='description'
    //                             onChange={handleChange}
    //                         />
    //                         <Button type='submit'>Create</Button>
    //                     </Form>
    //             }
    //         </div>
    //     </div>
    // )

}
export default NewNote;