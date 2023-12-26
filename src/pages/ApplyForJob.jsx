import React, { useState } from 'react';
import { Box, FormControl, FormLabel, Input, Select, Button, FormErrorMessage, } from '@chakra-ui/react';
import initReqBodyJson from '../assets/bodyJson/userDetailsBody.json';
import { useLocation, useNavigate } from "react-router-dom";
import Header from './Header';
import Loader from './Loader'; 

const ApplyForJob = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const state = location?.state;
  const jobDetails = state?.jobDetails?.responses[0];
  console.log({ state });
  const [formData, setFormData] = useState({
    person: {
      name: '',
      gender: '',
      age: '',
      resume: '',
      skills: [],
      languages: [],
      experience: '',
      currentCompany: '',
      expectedSalary: '',
      currentsalary: ''
    },
    contact: {
      phone: '',
      email: '',
    },
  });

  const [formErrors, setFormErrors] = useState({
    person: {
      name: '',
      gender: '',
      age: '',
      skills: '',
      languages: ''

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

    // Reset the error when the user starts typing
    setFormErrors((prevErrors) => ({
      ...prevErrors,
      [section]: {
        ...prevErrors[section],
        [field]: '',
      },
    }));
  };


  const convertToLanguageObjects = (languageCodes) => {
    const languageObjects = languageCodes.map((code) => ({
      code,
      name: getLanguageName(code), // You need a function to get the language name based on the code
    }));

    return languageObjects;
  };

  const getLanguageName = (code) => {
    const languageMap = {
      en: 'English',
      hi: 'Hindi',
      mr: 'Marathi',
      ml: 'Malayalam',
      bn: 'Bengali',
      te: 'Telugu',
    };

    return languageMap[code] || 'Unknown Language';
  };


  const handleSubmit = async () => {
    // Perform validation
    const errors = validateForm(formData);
    if (hasErrors(errors)) {
      setFormErrors(errors);
      return;
    }

    try {
      setLoading(true);
      const initReqBody = initReqBodyJson.init[0];

      initReqBody['customer']['person']['name'] = formData['person']['name'];
      initReqBody['customer']['person']['gender'] = formData['person']['gender'];
      initReqBody['customer']['person']['age'] = formData['person']['age'];
      //        initReqBody['customer']['person']['tags'][''] = formData['person'][];
      initReqBody['customer']['contact']['phone'] = formData['contact']['phone'];
      initReqBody['customer']['contact']['email'] = formData['contact']['email'];

      initReqBody['customer']['person']['languages'] = formData['person']['languages'];

      initReqBody['customer']['person']['tags'][0]['list'][0]['value'] = formData['person']['experience'];
      initReqBody['customer']['person']['tags'][0]['list'][1]['value'] = formData['person']['currentCompany'];

      initReqBody['customer']['person']['tags'][1]['list'][0]['value'] = formData['person']['expectedSalary'];
      initReqBody['customer']['person']['tags'][1]['list'][1]['value'] = formData['person']['currentsalary'];

      initReqBody['customer']['person']['tags'][2]['list'][0]['value'] = formData['person']['resume'];

      initReqBody['customer']['person']['languages'] = convertToLanguageObjects(formData['person']['languages']);

      initReqBody['customer']['person']['skills'] = formData['person']['skills'].map((item) => ({
        code: item,
        name: item,
      }));


      console.log(initReqBody);
      initReqBodyJson.init[1]['bpp_id'] = jobDetails?.context?.bap_uri;
      initReqBodyJson.init[1]['bpp_uri'] = jobDetails?.context?.bap_uri;
      initReqBodyJson.init[1].message.order.provider['id'] = jobDetails?.message?.order?.provider?.id;
      initReqBodyJson.init[1].message.order.items[0]['id'] = jobDetails?.message?.order?.items[0]?.id
      initReqBodyJson.init[1].message.order.fulfillments[0]['id'] = jobDetails?.message?.order?.items[0]?.fulfillment_ids[0]
      initReqBodyJson.init[1].message.order.fulfillments[0]['customer'] = initReqBody.customer;

      const paramBody = initReqBodyJson.init[1];
      console.log({ paramBody })

      // Perform API call with formData
      const response = await fetch('https://jobs-api.tekdinext.com/init', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(paramBody),
      });

      const data = await response.json()
      console.log(data);

      navigate('/applicationForm', { state: { initResponce: data } });


      // Handle the response as needed
    } catch (error) {
      console.error('Error submitting form:', error);
    }finally {
      setLoading(false);
    }
  };

  const validateForm = (data) => {
    // Implement your validation logic here
    const errors = {
      person: {
        name: '',
        gender: '',
        age: '',
        skills: '',
        languages: '',
      },
      contact: {
        phone: '',
        email: '',
      },
    };

    // Example: Check if required fields are empty
    if (!data.person.name) {
      errors.person.name = 'Name is required';
    }

    if (!data.person.gender) {
      errors.person.gender = 'Gender is required';
    }

    if (!data.person.age) {
      errors.person.age = 'Age is required';
    }

    // Add more validation logic as needed

    return errors;
  };

  const hasErrors = (errors) => {
    // Check if there are any validation errors
    return Object.values(errors).some((sectionErrors) =>
      Object.values(sectionErrors).some((error) => Boolean(error))
    );
  };

  return (
    <div>
      <Header />
      {loading && (
        // Show the loader while data is loading
        <Loader />
      )}

      <Box maxW="md" mx="auto" my="8" marginTop={100}>
        <FormControl isInvalid={Boolean(formErrors.person.name)}>
          <FormLabel>Name</FormLabel>
          <Input
            type="text"
            value={formData.person.name}
            onChange={(e) => handleInputChange('person', 'name', e.target.value)}
          />
          <FormErrorMessage>{formErrors.person.name}</FormErrorMessage>
        </FormControl>

        <FormControl mt="4" isInvalid={Boolean(formErrors.person.gender)}>
          <FormLabel>Gender</FormLabel>
          <Select
            value={formData.person.gender}
            onChange={(e) => handleInputChange('person', 'gender', e.target.value)}
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            {/* Add more options as needed */}
          </Select>
          <FormErrorMessage>{formErrors.person.gender}</FormErrorMessage>
        </FormControl>

        <FormControl mt="4" isInvalid={Boolean(formErrors.person.age)}>
          <FormLabel>Age</FormLabel>
          <Input
            type="number"
            value={formData.person.age}
            onChange={(e) => handleInputChange('person', 'age', e.target.value)}
          />
          <FormErrorMessage>{formErrors.person.age}</FormErrorMessage>
        </FormControl>

        <FormControl mt="4">
          <FormLabel>Skills</FormLabel>
          <Input
            type="text"
            placeholder="Enter skills separated by commas"
            value={formData.person.skills.join(',')}
            onChange={(e) =>
              handleInputChange(
                'person',
                'skills',
                e.target.value.split(',').map((s) => s.trim())
              )
            }
          />
        </FormControl>

        <FormControl mt="4" >
          <FormLabel>Languages</FormLabel>
          <Select height={100}
            multiple
            value={formData.person.languages}
            onChange={(e) =>
              handleInputChange(
                'person',
                'languages',
                Array.from(e.target.selectedOptions, (option) => option.value)
              )
            }
          >
            <option value="en">English</option>
            <option value="hi">Hindi</option>
            <option value="mr">Marathi</option>
            <option value="ml">Malayalam</option>
            <option value="bn">Bengali</option>
            <option value="te">Telugu</option>
            {/* Add more languages as needed */}
          </Select>
        </FormControl>

        <FormControl mt="4">
          <FormLabel>Experience (Years)</FormLabel>
          <Input
            type="number"
            value={formData.person.experience}
            onChange={(e) => handleInputChange('person', 'experience', e.target.value)}
          />
        </FormControl>

        <FormControl mt="4">
          <FormLabel>Current Company</FormLabel>
          <Input
            type="text"
            value={formData.person.currentCompany}
            onChange={(e) => handleInputChange('person', 'currentCompany', e.target.value)}
          />
        </FormControl>

        <FormControl mt="4">
          <FormLabel>Expected Salary</FormLabel>
          <Input
            type="number"
            value={formData.person.expectedSalary}
            onChange={(e) => handleInputChange('person', 'expectedSalary', e.target.value)}
          />
        </FormControl>
        <FormControl mt="4">
          <FormLabel>Current Salary</FormLabel>
          <Input
            type="number"
            value={formData.person.currentsalary}
            onChange={(e) => handleInputChange('person', 'currentsalary', e.target.value)}
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

        <FormControl mt="4">
          <FormLabel>Resume URL</FormLabel>
          <Input
            type="url"
            value={formData.person.resume}
            onChange={(e) => handleInputChange('person', 'resume', e.target.value)}
          />
        </FormControl>

        <Button mt="6" colorScheme="teal" onClick={handleSubmit}>
          Submit
        </Button>
      </Box>
    </div>
  );
};

export default ApplyForJob;
