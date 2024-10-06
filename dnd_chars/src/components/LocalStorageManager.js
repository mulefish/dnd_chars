// src/components/LocalStorageManager.js

import React, { useState, useEffect } from 'react';
import {
  Box,
  Textarea,
  Button,
  VStack,
  useToast,
} from '@chakra-ui/react';
import PropTypes from 'prop-types';

/**
 * LocalStorageManager Component
 * 
 * Provides a textarea for user input with two buttons:
 * - Save: Saves the textarea content to localStorage.
 * - Load: Retrieves the saved content from localStorage and populates the textarea.
 * 
 * Props:
 * - storageKey: A unique key for localStorage operations.
 * - initialValue: The initial value of the textarea.
 */
const LocalStorageManager = ({ storageKey, initialValue }) => {
  const [text, setText] = useState(initialValue);
  const toast = useToast();

  /**
   * Handles changes in the textarea.
   * @param {object} event - The change event from the textarea.
   */
  const handleChange = (event) => {
    setText(event.target.value);
  };

  /**
   * Saves the current textarea content to localStorage.
   */
  const handleSave = () => {
    try {
      localStorage.setItem(storageKey, text);
      toast({
        title: 'Saved',
        description: 'Textarea content has been saved to local storage.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error('Error saving to localStorage:', error);
      toast({
        title: 'Error',
        description: 'Failed to save content to local storage.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  /**
   * Loads the saved content from localStorage into the textarea.
   */
  const handleLoad = () => {
    try {
      const savedText = localStorage.getItem(storageKey);
      if (savedText !== null) {
        setText(savedText);
        toast({
          title: 'Loaded',
          description: 'Textarea content has been loaded from local storage.',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
      } else {
        toast({
          title: 'No Data',
          description: 'No saved content found in local storage.',
          status: 'info',
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error('Error loading from localStorage:', error);
      toast({
        title: 'Error',
        description: 'Failed to load content from local storage.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  /**
   * Optionally, load the saved content when the component mounts.
   * Uncomment the following useEffect if you want to auto-load on mount.
   */
  // useEffect(() => {
  //   handleLoad();
  // }, []);

  return (
    <Box p={4} borderWidth="1px" borderRadius="lg" boxShadow="md">
      <VStack spacing={4} align="stretch">
        <Textarea
            rows={20}
          value={text}
          onChange={handleChange}
          placeholder="Tell me..."
          size="md"
          resize="vertical"
        />
        <VStack spacing={2} direction="row">
          <Button colorScheme="teal" onClick={handleSave} width="100px">
            Save
          </Button>
          <Button colorScheme="blue" onClick={handleLoad} width="100px">
            Load
          </Button>
        </VStack>
      </VStack>
    </Box>
  );
};

// PropTypes for type checking
LocalStorageManager.propTypes = {
  storageKey: PropTypes.string.isRequired,
  initialValue: PropTypes.string,
};

// Default props
LocalStorageManager.defaultProps = {
  initialValue: '',
};

export default LocalStorageManager;
