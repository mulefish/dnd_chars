// App.js
import React, { useState, useEffect } from 'react';
import {
  ChakraProvider,
  Box,
  Heading,
  Grid,
  GridItem,
  Text,
  Select,
  Input,
  Button,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  VStack,
  HStack,
  Divider,
  FormControl,
  FormLabel,
  useToast,
} from '@chakra-ui/react';
import { useSelector, useDispatch } from 'react-redux';
import { updateHitPoints, updateResources } from './store';

function App() {
  // Get the characters from Redux store
  const characters = useSelector((state) => state.character);

  // Get the character keys (earnest, francis)
  const characterKeys = Object.keys(characters);

  // State to track the selected character
  const [selectedCharacter, setSelectedCharacter] = useState('earnest');

  // Local state to track the input fields
  const [formData, setFormData] = useState({
    hitPoints: characters.earnest.hitPoints,
    goldpieces: characters.earnest.goldpieces,
    silverpieces: characters.earnest.silverpieces,
    bronzepieces: characters.earnest.bronzepieces,
  });

  // Redux dispatch
  const dispatch = useDispatch();

  // Initialize toast
  const toast = useToast();

  // Update formData when selectedCharacter changes
  useEffect(() => {
    const current = characters[selectedCharacter];
    setFormData({
      hitPoints: current.hitPoints,
      goldpieces: current.goldpieces,
      silverpieces: current.silverpieces,
      bronzepieces: current.bronzepieces,
    });
  }, [selectedCharacter, characters]);

  // Handle dropdown selection change
  const handleCharacterChange = (event) => {
    const selected = event.target.value;
    setSelectedCharacter(selected);
    // formData is updated via useEffect
  };

  // Handle input field changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // Ensure numeric values and prevent negative numbers
    const numericValue = Math.max(0, parseInt(value, 10) || 0);
    setFormData((prev) => ({
      ...prev,
      [name]: numericValue,
    }));
  };

  // Handle updating all fields
  const handleUpdateAll = () => {
    dispatch(updateHitPoints({ characterName: selectedCharacter, newHitPoints: formData.hitPoints }));
    dispatch(
      updateResources({
        characterName: selectedCharacter,
        goldpieces: formData.goldpieces,
        silverpieces: formData.silverpieces,
        bronzepieces: formData.bronzepieces,
      })
    );
    toast({
      title: "Character Updated",
      description: `${selectedCharacter.charAt(0).toUpperCase() + selectedCharacter.slice(1)}'s hit points and resources have been updated.`,
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  // Get the stats for the currently selected character
  const currentCharacterStats = characters[selectedCharacter];

  return (
    <ChakraProvider>
      <Box maxWidth="800px" mx="auto" p={6}>
        <Heading as="h1" textAlign="center" mb={6}>
          D&D Character Sheet
        </Heading>

        {/* Dropdown to select character */}
        <Select
          value={selectedCharacter}
          onChange={handleCharacterChange}
          mb={6}
        >
          {characterKeys.map((key) => (
            <option key={key} value={key}>
              {key.charAt(0).toUpperCase() + key.slice(1)}
            </option>
          ))}
        </Select>

        {/* Ability Scores Section */}
        <Heading as="h2" size="lg" mt={8} mb={4}>
          Ability Scores for {selectedCharacter.charAt(0).toUpperCase() + selectedCharacter.slice(1)}
        </Heading>
        <Grid templateColumns="repeat(2, 1fr)" gap={4}>
          <GridItem>
            <Text>
              <strong>Strength (STR):</strong> {currentCharacterStats.STR.value} (
              Bonus: {currentCharacterStats.STR.bonus})
            </Text>
          </GridItem>
          <GridItem>
            <Text>
              <strong>Dexterity (DEX):</strong> {currentCharacterStats.DEX.value} (
              Bonus: {currentCharacterStats.DEX.bonus})
            </Text>
          </GridItem>
          <GridItem>
            <Text>
              <strong>Constitution (CON):</strong> {currentCharacterStats.CON.value} (
              Bonus: {currentCharacterStats.CON.bonus})
            </Text>
          </GridItem>
          <GridItem>
            <Text>
              <strong>Intelligence (INT):</strong> {currentCharacterStats.INT.value} (
              Bonus: {currentCharacterStats.INT.bonus})
            </Text>
          </GridItem>
          <GridItem>
            <Text>
              <strong>Wisdom (WIS):</strong> {currentCharacterStats.WIS.value} (
              Bonus: {currentCharacterStats.WIS.bonus})
            </Text>
          </GridItem>
          <GridItem>
            <Text>
              <strong>Charisma (CHR):</strong> {currentCharacterStats.CHR.value} (
              Bonus: {currentCharacterStats.CHR.bonus})
            </Text>
          </GridItem>
        </Grid>

        {/* Hit Points and Resources Section */}
        <Heading as="h2" size="lg" mt={8} mb={4}>
          Hit Points & Resources
        </Heading>
        <Grid templateColumns="repeat(2, 1fr)" gap={4} alignItems="start">
          <GridItem>
            <FormControl mb={4}>
              <FormLabel>Hit Points</FormLabel>
              <Input
                type="number"
                name="hitPoints"
                value={formData.hitPoints}
                onChange={handleInputChange}
                min="0"
                size="sm"
              />
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>Gold Pieces</FormLabel>
              <Input
                type="number"
                name="goldpieces"
                value={formData.goldpieces}
                onChange={handleInputChange}
                min="0"
                size="sm"
              />
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>Silver Pieces</FormLabel>
              <Input
                type="number"
                name="silverpieces"
                value={formData.silverpieces}
                onChange={handleInputChange}
                min="0"
                size="sm"
              />
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>Bronze Pieces</FormLabel>
              <Input
                type="number"
                name="bronzepieces"
                value={formData.bronzepieces}
                onChange={handleInputChange}
                min="0"
                size="sm"
              />
            </FormControl>
            <Button colorScheme="teal" onClick={handleUpdateAll} mt={2}>
              Update All
            </Button>
          </GridItem>
        </Grid>

        {/* Divider */}
        <Divider my={6} />

        {/* Channel Divinity Section */}
        {currentCharacterStats.channel_divinity &&
          Object.keys(currentCharacterStats.channel_divinity).length > 0 && (
            <>
              <Heading as="h2" size="lg" mt={8} mb={4}>
                Channel Divinity
              </Heading>
              <Accordion allowMultiple>
                {Object.entries(currentCharacterStats.channel_divinity).map(
                  ([abilityName, abilityDesc]) => (
                    <AccordionItem key={abilityName}>
                      <h2>
                        <AccordionButton>
                          <Box flex="1" textAlign="left">
                            {abilityName}
                          </Box>
                          <AccordionIcon />
                        </AccordionButton>
                      </h2>
                      <AccordionPanel pb={4}>{abilityDesc}</AccordionPanel>
                    </AccordionItem>
                  )
                )}
              </Accordion>
            </>
          )}

        {/* Spells Section */}
        {currentCharacterStats.spells &&
          Object.keys(currentCharacterStats.spells).length > 0 && (
            <>
              <Heading as="h2" size="lg" mt={8} mb={4}>
                Spells
              </Heading>
              <Accordion allowMultiple>
                {Object.entries(currentCharacterStats.spells).map(
                  ([level, spellList]) => (
                    <AccordionItem key={level}>
                      <h2>
                        <AccordionButton>
                          <Box flex="1" textAlign="left">
                            {level.charAt(0).toUpperCase() + level.slice(1)} Level
                            Spells
                          </Box>
                          <AccordionIcon />
                        </AccordionButton>
                      </h2>
                      <AccordionPanel pb={4}>
                        <VStack align="start" spacing={3}>
                          {Object.entries(spellList).map(
                            ([spellName, spellDetails]) => (
                              <Box key={spellName} w="100%">
                                <Text fontWeight="bold">
                                  {spellName} ({spellDetails.type})
                                </Text>
                                <Text ml={4}>{spellDetails.desc}</Text>
                              </Box>
                            )
                          )}
                        </VStack>
                      </AccordionPanel>
                    </AccordionItem>
                  )
                )}
              </Accordion>
            </>
          )}
      </Box>
    </ChakraProvider>
  );
}

export default App;
