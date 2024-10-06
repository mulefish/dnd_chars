// components/Resources.js
import React from 'react';
import { Grid, GridItem, FormControl, FormLabel, Input, Button } from '@chakra-ui/react';

const Resources = ({ formData, handleInputChange, handleUpdateAll }) => {
  return (
    <Grid templateColumns="repeat(2, 1fr)" gap={4} alignItems="center">
      {/* Hit Points */}
      <FormControl>
        <FormLabel htmlFor="hitPoints">Hit Points</FormLabel>
      </FormControl>
      <Input
        id="hitPoints"
        type="number"
        name="hitPoints"
        value={formData.hitPoints}
        onChange={handleInputChange}
        min="0"
        size="sm"
        width="80px"
      />

      {/* Gold Pieces */}
      <FormControl>
        <FormLabel htmlFor="goldpieces">Gold Pieces</FormLabel>
      </FormControl>
      <Input
        id="goldpieces"
        type="number"
        name="goldpieces"
        value={formData.goldpieces}
        onChange={handleInputChange}
        min="0"
        size="sm"
        width="80px"
      />

      {/* Silver Pieces */}
      <FormControl>
        <FormLabel htmlFor="silverpieces">Silver Pieces</FormLabel>
      </FormControl>
      <Input
        id="silverpieces"
        type="number"
        name="silverpieces"
        value={formData.silverpieces}
        onChange={handleInputChange}
        min="0"
        size="sm"
        width="80px"
      />

      {/* Bronze Pieces */}
      <FormControl>
        <FormLabel htmlFor="bronzepieces">Bronze Pieces</FormLabel>
      </FormControl>
      <Input
        id="bronzepieces"
        type="number"
        name="bronzepieces"
        value={formData.bronzepieces}
        onChange={handleInputChange}
        min="0"
        size="sm"
        width="80px"
      />

      {/* Update All Button */}
      <GridItem colSpan={2} textAlign="right">
        <Button
          colorScheme="teal"
          onClick={handleUpdateAll}
          mt={2}
          width="100px"
        >
          Update All
        </Button>
      </GridItem>
    </Grid>
  );
};

export default Resources;
