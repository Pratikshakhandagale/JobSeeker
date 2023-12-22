import React, { useState } from 'react';
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Select,
  Button,
} from '@chakra-ui/react';

const ApplyForJob = () => {
  const [formData, setFormData] = useState({
    person: {
      name: '',
      gender: '',
      age: '',
    },
    contact: {
      phone: '',
      email: '',
    },
  });

  const handleInputChange = (section, field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [section]: {
        ...prevData[section],
        [field]: value,
      },
    }));
  };

  const handleSubmit = async () => {
    try {
      // Perform API call with formData
      const response = await fetch('YOUR_API_ENDPOINT', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      // Handle the response as needed
      console.log(response);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <Box maxW="md" mx="auto" mt="8">
      <FormControl>
        <FormLabel>Name</FormLabel>
        <Input
          type="text"
          value={formData.person.name}
          onChange={(e) => handleInputChange('person', 'name', e.target.value)}
        />
      </FormControl>

      <FormControl mt="4">
        <FormLabel>Gender</FormLabel>
        <Select
          value={formData.person.gender}
          onChange={(e) => handleInputChange('person', 'gender', e.target.value)}
        >
          <option value="male">Male</option>
          <option value="female">Female</option>
          {/* Add more options as needed */}
        </Select>
      </FormControl>

      <FormControl mt="4">
        <FormLabel>Age</FormLabel>
        <Input
          type="number"
          value={formData.person.age}
          onChange={(e) => handleInputChange('person', 'age', e.target.value)}
        />
      </FormControl>

      <FormControl mt="4">
        <FormLabel>Phone</FormLabel>
        <Input
          type="tel"
          value={formData.contact.phone}
          onChange={(e) => handleInputChange('contact', 'phone', e.target.value)}
        />
      </FormControl>

      <FormControl mt="4">
        <FormLabel>Email</FormLabel>
        <Input
          type="email"
          value={formData.contact.email}
          onChange={(e) => handleInputChange('contact', 'email', e.target.value)}
        />
      </FormControl>

      <Button mt="6" colorScheme="teal" onClick={handleSubmit}>
        Submit
      </Button>
    </Box>
  );
};

export default ApplyForJob;


