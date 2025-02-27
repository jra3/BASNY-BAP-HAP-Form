import { useEffect } from 'react';
import { useFormContext } from './FormContext';
import { useNavigate } from 'react-router-dom';

const PrintPage = () => {
    const { formData } = useFormContext();
    const navigate = useNavigate();

    useEffect(() => {
        if (!formData.memberName) {
            navigate('/');
        }
    }, []);

    return (
        <div>
            <h2>Printable Form</h2>
            <p><strong>Name:</strong> {formData.memberName}</p>
            <p><strong>Email:</strong> {formData.speciesCommonName}</p>
            <p><strong>Age:</strong> {formData.speciesLatinName}</p>
            <button onClick={() => navigate('/')}>Edit</button>
            <button onClick={() => window.print()}>Print</button>
        </div>
    );
};

export default PrintPage;
