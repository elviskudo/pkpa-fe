// ChildDrawer.js
import React, { useState } from 'react';
import { Drawer, Button, TextField, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const AddDrawer = ({ showDrawer, setShowDrawer, addUser }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [university, setUniversity] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        const newUser = {
            name,
            email,
            phone,
            university,
            password
        };

        addUser(newUser);

        // Clear form and close drawer
        setName('');
        setEmail('');
        setPhone('');
        setUniversity('');
        setPassword('');
        setShowDrawer(false);
    };

    return (
        <Drawer anchor="right" open={showDrawer} onClose={() => setShowDrawer(false)}>
            <div style={{ width: 300, padding: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h5 style={{ margin: 0 }}>Tambah Peserta</h5>
                    <IconButton onClick={() => setShowDrawer(false)}>
                        <CloseIcon />
                    </IconButton>
                </div>
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Nama Lengkap"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        required
                    />
                    <TextField
                        label="Email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        required
                    />
                    <TextField
                        label="Nomor Handphone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        required
                    />
                    <TextField
                        label="Universitas"
                        value={university}
                        onChange={(e) => setUniversity(e.target.value)}
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        required
                    />
                    <TextField
                        label="Password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        required
                    />
                    <Button
                        type="submit" variant="contained" style={{ backgroundColor: '#F97316', color: 'white' }} fullWidth>
                        Simpan
                    </Button>
                </form>
            </div>
        </Drawer>
    );
};

export default AddDrawer;
