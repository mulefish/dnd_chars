// src/components/SlotsMatrix.js

import React, { useState } from 'react';
import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    Checkbox,
} from '@chakra-ui/react';

const SlotsMatrix = () => {
    return (
        <Table variant="simple" size="sm">
            <Thead>
                <Tr>
                    Slots
                </Tr>

            </Thead>
            <Tbody>
                <Tr>
                    <Td>
                        Luck &nbsp; <Checkbox /><Checkbox /><Checkbox />
                    </Td>
                </Tr><Tr>
                    <Td>
                        First &nbsp; <Checkbox /><Checkbox /><Checkbox /><Checkbox />
                    </Td>
                    </Tr><Tr>

                    <Td>
                        Second &nbsp; <Checkbox /><Checkbox /><Checkbox />
                    </Td>
                    </Tr><Tr>
                    <Td>
                        Third &nbsp; <Checkbox /><Checkbox />
                    </Td>
                </Tr>
            </Tbody>
        </Table>
    );
}
export default SlotsMatrix;
