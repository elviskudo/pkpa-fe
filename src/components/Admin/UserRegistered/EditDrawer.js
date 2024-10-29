import React, { useState, useEffect } from 'react';
import { Drawer, Button, TextField, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const EditDrawer = ({ showEditDrawer, setShowEditDrawer, selectedUser, editUser }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [university, setUniversity] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        if (selectedUser) {
            setName(selectedUser.name);
            setEmail(selectedUser.email);
            setPhone(selectedUser.phone);
            setUniversity(selectedUser.university);
            setPassword(selectedUser.password); // Initialize password
        }
    }, [selectedUser]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const updatedUser = { ...selectedUser, name, email, phone, university, password };
        editUser(updatedUser);
        setShowEditDrawer(false); // Close the drawer
    };

    return (
        <Drawer anchor="right" open={showEditDrawer} onClose={() => setShowEditDrawer(false)}>
            <div style={{ width: 300, padding: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h5 style={{ margin: 0 }}>Edit Admin</h5>
                    <IconButton onClick={() => setShowEditDrawer(false)}>
                        <CloseIcon />
                    </IconButton>
                </div>
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Nama Lengkap"
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                    <TextField
                        label="Email"
                        type="email"
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <TextField
                        label="Nomor Handphone"
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                    />
                    <TextField
                        label="Universitas"
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        value={university}
                        onChange={(e) => setUniversity(e.target.value)}
                        required
                    />
                    <TextField
                        label="Password"
                        type="password"
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)} // Allow password to be changed
                        required
                    />
                    <Button type="submit" variant="contained" style={{ backgroundColor: '#F97316', color: 'white' }} fullWidth>
                        Simpan
                    </Button>
                </form>
            </div>
        </Drawer>
    );
};

export default EditDrawer;
