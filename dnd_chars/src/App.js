import React, { useState } from 'react';
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
} from '@chakra-ui/react';
import { useSelector, useDispatch } from 'react-redux';
import { updateHitPoints } from './store';

function App() {
  // Get the characters from Redux store
  const characters = useSelector((state) => state.character);
  
  // Get the character keys (earnest, francis)
  const characterKeys = Object.keys(characters);
  
  // State to track the selected character
  const [selectedCharacter, setSelectedCharacter] = useState('earnest');
  
  // Local state to track the new hit points input
  const [newHitPoints, setNewHitPoints] = useState(characters.earnest.hitPoints);
  
  // Redux dispatch
  const dispatch = useDispatch();

  // Handle dropdown selection change
  const handleCharacterChange = (event) => {
    const selected = event.target.value;
    setSelectedCharacter(selected);
    setNewHitPoints(characters[selected].hitPoints); // Update the input with the new hit points
  };

  // Handle hit points update
  const handleHitPointsUpdate = () => {
    dispatch(updateHitPoints({ characterName: selectedCharacter, newHitPoints }));
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
            <Text>Strength: {currentCharacterStats.STR.value} (Bonus: {currentCharacterStats.STR.bonus})</Text>
          </GridItem>
          <GridItem>
            <Text>Dexterity: {currentCharacterStats.DEX.value} (Bonus: {currentCharacterStats.DEX.bonus})</Text>
          </GridItem>
          <GridItem>
            <Text>Constitution: {currentCharacterStats.CON.value} (Bonus: {currentCharacterStats.CON.bonus})</Text>
          </GridItem>
          <GridItem>
            <Text>Intelligence: {currentCharacterStats.INT.value} (Bonus: {currentCharacterStats.INT.bonus})</Text>
          </GridItem>
          <GridItem>
            <Text>Wisdom: {currentCharacterStats.WIS.value} (Bonus: {currentCharacterStats.WIS.bonus})</Text>
          </GridItem>
          <GridItem>
            <Text>Charisma: {currentCharacterStats.CHR.value} (Bonus: {currentCharacterStats.CHR.bonus})</Text>
          </GridItem>
        </Grid>

        {/* Hit Points Section */}
        <Heading as="h2" size="lg" mt={8} mb={4}>
          Hit Points
        </Heading>
        <Grid templateColumns="repeat(2, 1fr)" gap={4}>
          <GridItem>
            <Text>Current Hit Points: {currentCharacterStats.hitPoints}</Text>
          </GridItem>
          <GridItem>
            <Input
              type="number"
              value={newHitPoints}
              onChange={(e) => setNewHitPoints(parseInt(e.target.value, 10))}
              placeholder="Enter new hit points"
            />
            <Button mt={2} colorScheme="teal" onClick={handleHitPointsUpdate}>
              Update Hit Points
            </Button>
          </GridItem>
        </Grid>
      </Box>
    </ChakraProvider>
  );
}

export default App;
