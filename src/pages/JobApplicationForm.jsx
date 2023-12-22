import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Header from './Header';
import initJson from './init.json';

import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Select,
  Textarea,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from '@chakra-ui/react';

const JobApplicationForm = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const [submissionStatus, setSubmissionStatus] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [responseId, setResponseId] = useState(null);

  const jobsData  = initJson?.responses[0]?.message?.order?.items[0].xinput.form.url;
  const xinput  = initJson?.responses[0]?.message?.order?.items[0].xinput;

  console.log(jobsData);

  useEffect(() => {
    const fetchFormDetail = async (url) => {
      // Implement your fetch logic here
      const response = await fetch(url);
      const formHtml = await response.text();
      return formHtml;
    };

    const submitFormDetail = async (action, data) => {
      // Implement your submit logic here
      const response = await fetch(action, {
        method: 'POST',
        body: data,
      });
      const result = await response.json(); // Assuming the response is JSON
      return result.submission_id;
    };

    const loadForm = async () => {
      const formHtml = await fetchFormDetail(xinput?.form.url);

      // Update the form container
      const container = document.getElementById('formContainer');
      if (container) {
        container.innerHTML = formHtml;
        const form = document.getElementsByTagName('form')[0];

        if (form) {
          // Insert a submit button to the form
          const inputElement = document.createElement('input');
          inputElement.setAttribute('type', 'submit');
          inputElement.setAttribute('value', 'Submit');
          form.appendChild(inputElement);

          // Intercept the default form submission and submit manually
          form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const formData = new FormData(form);
            const urlencoded = new URLSearchParams();

            formData.forEach(function (value, key) {
              urlencoded.append(key, value.toString());
            });

            // Manually call post api to form.action, and get submission_id in the response
            const submissionId = await submitFormDetail(form.action, urlencoded);

            // Proceed with init action with submission_id
            console.log('Submission ID:', submissionId);
          });
        }
      }
    };

    loadForm();
  }, [xinput?.form.url]);

  return <div id="formContainer"></div>;
};

export default JobApplicationForm;
