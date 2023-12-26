import React, { useState, useEffect } from 'react';
import Header from './Header';
import { MdLocationPin } from "react-icons/md";
import { FaRupeeSign, FaBriefcase } from 'react-icons/fa';
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import selectJson from '../assets/bodyJson/selectResult.json';
import Loader from './Loader'; 
import {
    Box,
    Text,
    HStack,
    Icon,
    Button,
    Spinner
} from "@chakra-ui/react";

function JobDetails() {
    const [loading, setLoading] = useState(true);

    const location = useLocation();
    const state = location?.state;
    const [showIframe, setShowIframe] = useState(true);

    const navigate = useNavigate();
    const { t } = useTranslation();

    const [jobInfo, setJobInfo] = useState(state?.product);
   const [jobsData, setJobsData] = useState(null);
         const [jobDetails, setJobDetails] = useState(null);


    // const jobsData  = selectJson?.responses[0]?.message?.order?.items[0]
    //console.log(jobsData);
  
    const fetchJobDetails = async () => {
      try {
        setLoading(true);
  
        const response = await fetch('https://jobs-api.tekdinext.com/select', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
                "context": {
                    "domain": "onest:work-opportunities",
                    "action": "select",
                    "version": "1.1.0",
                    "bap_id": "jobs-bap.tekdinext.com",
                    "bap_uri": "https://jobs-bap.tekdinext.com",
                    "bpp_id": jobInfo?.bpp_id,
                    "bpp_uri": 'https://dash-beckn.tibilapps.com/protocol-network',//jobInfo?.bpp_uri,
                    "transaction_id": "a9aaecca-10b7-4d19-b640-b047a7c60008",
                    "message_id": "a9aaecca-10b7-4d19-b640-b047a7c60009",
                    "timestamp": "2023-02-06T09:55:41.161Z"
                },
                "message": {
                    "order": {
                        "provider": {
                            "id": "1"
                        },
                        "items": [
                            {
                                "id": jobInfo?.item_id
                            }
                        ]
                    }
                
            }
          }),
        });
  
        const data = await response.json();
  console.log({data});
  setJobDetails(data)
  setJobsData(data?.responses[0]?.message?.order?.items[0]);
      } catch (error) {
        console.error('Error fetching job details:', error);
      } finally {
        setLoading(false);
      }
    };
  
    useEffect(() => {
      fetchJobDetails();
    }, []); // Runs only once when the component mounts
  


    // console.log(state?.product)
    function getUniqueNumber() {
        const timestamp = new Date().getTime(); // Get current timestamp in milliseconds
        const uniqueNumber = timestamp + Math.floor(Math.random() * 1000); // Append a random number
      
        return uniqueNumber;
      }
      
      // Example usage
      const uniqueNumber = getUniqueNumber();
    //   console.log(uniqueNumber);


    return (
        <div>
            <Header />

            <Box marginTop={100} padding={10} backgroundColor={"gray.50"} marginLeft={5} marginRight={5} fontFamily={'serif'}>
                <Box>
                <Text marginTop={'2'} fontSize={20}>{jobInfo?.title}</Text>
                <HStack marginTop={'2'}>
                    {(jobInfo?.city || jobInfo?.state) && (
                        <div style={{ display: 'flex' }}>
                            <Icon as={MdLocationPin} boxSize={4} /> <Text fontSize="13px"> {jobInfo?.city}</Text>{(jobInfo?.city && jobInfo?.state) ? (<Text fontSize="13px"> , {jobInfo?.state}</Text>) : (<Text fontSize="13px"> {jobInfo?.state}</Text>)}

                            <Icon as={FaBriefcase} boxSize={4} marginLeft={3} />
                            {(jobInfo?.work_mode) ? (<Text fontSize="13px">{jobInfo?.work_mode} </Text>)
                                : (<Text fontSize="13px" marginLeft={1}>Full Time</Text>)}
                            <Text fontSize="13px" marginLeft={1}> | Immediate Joiner</Text>
                        </div>

                    )}
                </HStack>

                {jobInfo?.company ? (
                    <Text marginTop={'3'} fontSize={14} fontWeight={700}>{jobInfo?.company}</Text>
                ) : (
                    <Text marginTop={'3'} fontSize={14} color={'gray.700'} >Company name not available</Text>
                )}

                {/* <HStack marginTop={'2'} color={'blue'}>
                    <Icon as={FaRupeeSign} boxSize={3} /> <Text fontSize="13px">10,000 </Text> <Text>-</Text>
                    <Icon as={FaRupeeSign} boxSize={3} /> <Text fontSize="13px">50,000</Text>
                </HStack> */}

                <HStack marginTop={'2'} color={'blue'} style={{ display: 'flex' }}>
                    <Icon as={FaRupeeSign} boxSize={3} marginBottom={1} />
                    {jobInfo?.salary ? (
                        <Text fontSize="13px">{jobInfo?.salary}</Text>
                    ) : (
                        <Text fontSize="13px">As per Industry Standard</Text>
                    )}
                </HStack>
                </Box>
                <Box marginTop={2} display="flex" justifyContent="flex-start">
                    <Button                    
                        marginTop={2}
                        marginRight={5}
                        width={200}
                        colorScheme="blue"
                        variant="solid"
                        backgroundColor="blue.500"
                        color="white"
                        onClick={() => {
                            navigate("/apply", {
                                state: {
                                    jobDetails: jobDetails,
                                },
                              });
                        }}
                    >  {t("Apply")}

                    </Button>
                </Box>
                </Box>
                {loading ? ( <Loader />
      ) : (
                <Box  padding={10}  fontFamily={'serif'}>
                <Text fontSize={20}  fontWeight={700}>Job Description</Text>
                
                {jobInfo?.description ? (
                                <Text marginTop={4} fontSize={13} color={"gray.700"}>  {jobInfo?.description}  </Text>
                            ) : (
                                <Text marginTop={4} fontSize={13} color={"gray.700"}>  Job description is not available  </Text>
                            )}
                <Box marginTop={5}>
                    {jobsData?.tags?.map((tag, index) => (
                        <div key={index}>
                            <Text fontSize={13} color={'black'} fontWeight={700}>{tag.descriptor.name} : </Text>
                            {tag.list.map((item, itemIndex) => (
                                <div key={itemIndex}>
                                    <ul style={{ marginLeft: '3rem', listStyleType: 'disc' }}>
                                        <li>
                                        {(!item?.descriptor?.name && item?.descriptor?.code && item?.value  != "")&&  <Text fontSize={13} color="gray.700"> {item?.descriptor?.code} </Text> }
                                         
                                       {item?.descriptor?.name && <Text fontSize={13} color="gray.900"> {item?.descriptor?.name} </Text>}
                                          { item?.value && <Text fontSize={13} color="gray.700">
                                                {item?.value}
                                            </Text>}
                                        </li>
                                    </ul>
                                </div>
                            ))}
                        </div>
                    ))}
                </Box>

               
            </Box>
             )}
            {/* <Box marginLeft={5} fontFamily={'serif'}>
                <Tabs variant='enclosed' marginTop={5}>
                    <TabList>
                        <Tab fontSize={13}> Job Details</Tab>
                        {(jobInfo?.qualification || jobInfo?.skills) && <Tab fontSize={13}>Skills & Qualification</Tab>}
                        {jobInfo?.responsiblities && <Tab fontSize={13}>Responsiblities</Tab>}

                    </TabList>
                    <TabPanels>
                        <TabPanel>
                            <Text fontSize={14} fontWeight={700}>Job Description</Text>

                            {jobInfo?.description ? (
                                <Text marginTop={4} fontSize={13}>  {jobInfo?.description}  </Text>
                            ) : (
                                <Text marginTop={4} fontSize={13} color={"gray.500"}>  Job description is not available  </Text>
                            )}
                        </TabPanel>
                        <TabPanel>
                            {jobInfo?.skills && (

                                <Box marginTop={4}>
                                    <Text fontSize={14} fontWeight={700}>Key Skills</Text>
                                    <Text marginTop={4} fontSize={13}>
                                        {jobInfo?.skills}
                                    </Text>
                                </Box>
                            )}

                            {jobInfo?.qualification && (

                                <Box marginTop={4}>
                                    <Text fontSize={14} fontWeight={700}>Qualification</Text>
                                    <Text marginTop={4} fontSize={13}>
                                        {jobInfo?.qualification}

                                    </Text>
                                </Box>
                            )}

                        </TabPanel>
                        <TabPanel>
                            <Text fontSize={14} fontWeight={700}>Responsiblities</Text>

                            {jobInfo?.responsiblities ? (
                                <Text marginTop={4} fontSize={13}>  {jobInfo?.responsiblities}  </Text>
                            ) : (
                                <Text marginTop={4} fontSize={13} color={"gray.500"}>  Job Responsiblities is not available  </Text>
                            )}
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </Box> */}
        </div>




    );

}

export default JobDetails;