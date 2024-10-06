// store.js
import { configureStore, createSlice } from '@reduxjs/toolkit';

// Initial state with Earnest's and Francis' stats and hit points
const initialCharacterState = {
  earnest: {
    STR: { value: 20, bonus: 5 },
    DEX: { value: 10, bonus: 0 },
    CON: { value: 13, bonus: 1 },
    INT: { value: 8, bonus: -1 },
    WIS: { value: 14, bonus: 2 },
    CHR: { value: 14, bonus: 2 },
    hitPoints: 63, // Added hit points for Earnest
    goldpieces: 1,
    silverpieces: 0,
    bronzepieces: 0,
    channel_divinity: {
      "Divine Smite":"Starting at 2nd level, when you hit a creature with a melee weapon attack, you can expend one spell slot to deal radiant damage to the target, in addition to the weapon's damage. The extra damage is 2d8 for a 1st-level spell slot, plus 1d8 for each spell level higher than 1st, to a maximum of 5d8. The damage increases by 1d8 if the target is an undead or a fiend.",
      "Abjure Enemy":
        "As an action, you present your holy symbol and speak a prayer of denunciation, using your Channel Divinity. Choose one creature within 60 feet of you that you can see. That creature must make a Wisdom saving throw, unless it is immune to being frightened. Fiends and undead have disadvantage on this saving throw. On a failed save, the creature is frightened for 1 minute or until it takes any damage. While frightened, the creature's speed is 0, and it can't benefit from any bonus to its speed. On a successful save, the creature's speed is halved for 1 minute or until the creature takes any damage.",
      "Vow of Enmity":
        "As a bonus action, you can utter a vow of enmity against a creature you can see within 10 feet of you, using your Channel Divinity. You gain advantage on attack rolls against the creature for 1 minute or until it drops to 0 hit points or falls unconscious.",
      Lucky:
        "You have inexplicable luck that seems to kick in at just the right moment.You have 3 luck points. Whenever you make an attack roll, an ability check, or a saving throw, you can spend one luck point to roll an additional d20. You can choose to spend one of your luck points after you roll the die, but before the outcome is determined. You choose which of the d20s is used for the attack roll, ability check, or saving throw. You can also spend one luck point when an attack roll is made against you. Roll a d20 and then choose whether the attack uses the attacker's roll or yours.If more than one creature spends a luck point to influence the outcome of a roll, the points cancel each other out; no additional dice are rolled. You regain your expended luck points when you finish a long rest.",

    },

    spells: {
      // 4,3,2
      first: {
        "Shield of Faith": {
          type: "bonus action",
          desc: "A shimmering field appears and surrounds a creature of your choice within range, granting it a +2 bonus to AC for the duration.",
        },
        "Compelled Duel": {
          type: "bonus action",
          desc: "You attempt to compel a creature into a duel. One creature that you can see within range must make a Wisdom saving throw. On a failed save, the creature is drawn to you, compelled by your divine demand. For the duration, it has disadvantage on attack rolls against creatures other than you, and must make a Wisdom saving throw each time it attempts to move to a space that is more than 30 feet away from you; if it succeeds on this saving throw, this spell doesn’t restrict the target’s movement for that turn. The spell ends if you attack any other creature, if you cast a spell that targets a hostile creature other than the target, if a creature friendly to you damages the target or casts a harmful spell on it, or if you end your turn more than 30 feet away from the target.",
        },
        Bless: {
          type: "Concentration",
          desc: "1 minute. You bless up to three creatures of your choice within range. Whenever a target makes an attack roll or a saving throw before the spell ends, the target can roll a d4 and add the number rolled to the attack roll or saving throw.",
        },
        Command: {
          type: "action",
          desc: "You speak a one-word command to a creature you can see within range. The target must succeed on a Wisdom saving throw or follow the command on its next turn. The spell has no effect if the target is undead, if it doesn’t understand your language, or if your command is directly harmful to it. Some typical commands and their effects follow. You might issue a command other than one described here. If you do so, the DM determines how the target behaves. If the target can’t follow your command, the spell ends. Grovel. The target falls prone and then ends its turn.",
        },
        Bane: {
          type: "action",
          desc: "Up to three creatures of your choice that you can see within range must make Charisma saving throw. Whenever a target that fails this saving throw makes an attack roll or a saving throw before the spell ends, the target must roll a d4 and subtract the number rolled from the attack roll or saving throw.",
        },
        "Hunter's Mark": {
          type: "action",
          desc: "You choose a creature you can see within range and mystically mark it as your quarry. Until the spell ends, you deal an extra 1d6 damage to the target whenever you hit it with a weapon attack, and you have advantage on any Wisdom (Perception) or Wisdom (Survival) check you make to find it. If the target drops to 0 hit points before this spell ends, you can use a bonus action on a subsequent turn of yours to mark a new creature.",
        },
      },
      second: {
        "Find Steed": {
          type: "summon",
          desc: "You summon a spirit that assumes the form of an unusually intelligent, strong, and loyal steed, creating a long-lasting bond with it. Appearing in an unoccupied space within range, the steed takes on a form that you choose: a warhorse, a pony, a camel, an elk, or a mastiff. (Your DM might allow other animals to be summoned as steeds.) The steed has the statistics of the chosen form, though it is a celestial, fey, or fiend (your choice) instead of its normal type. Additionally, if your steed has an Intelligence of 5 or less, its Intelligence becomes 6, and it gains the ability to understand one language of your choice that you speak.",
        },
        "Zone of Truth": {
          type: "action",
          desc: "You create a magical zone that guards against deception in a 15-foot-radius sphere centered on a point of your choice within range. Until the spell ends, a creature that enters the spell’s area for the first time on a turn or starts its turn there must make a Charisma saving throw. On a failed save, a creature can’t speak a deliberate lie while in the radius. You know whether each creature succeeds or fails on its saving throw. An affected creature is aware of the spell and can thus avoid answering questions to which it would normally respond with a lie. Such creatures can be evasive in its answers as long as it remains within the boundaries of the truth.",
        },
        "Lesser Restoration": {
          type: "action",
          desc: "You touch a creature and can end either one disease or one condition afflicting it. The condition can be blinded, deafened, paralyzed, or poisoned.",
        },
        "Hold Person": {
          type: "action",
          desc: "Choose a humanoid that you can see within range. The target must succeed on a Wisdom saving throw or be paralyzed for the duration. At the end of each of its turns, the target can make another Wisdom saving throw. On a success, the spell ends on the target.",
        },
        "Misty Step": {
          type: "bonus action",
          desc: "Briefly surrounded by silvery mist, you teleport up to 30 feet to an unoccupied space that you can see.",
        },
      },

      third: {
        "Remove Curse": {
          type: "action",
          desc: "At your touch, all curses affecting one creature or object end. If the object is a cursed magic item, its curse remains, but the spell breaks its owner’s attunement to the object so it can be removed or discarded.",
        },
        "Dispel Magic": {
          type: "action",
          desc: "Choose any creature, object, or magical effect within range. Any spell of 3rd level or lower on the target ends. For each spell of 4th level or higher on the target, make an ability check using your spellcasting ability. The DC equals 10 + the spell's level. On a successful check, the spell ends.",
        },
        Haste: {
          type: "action",
          desc: "Choose a willing creature that you can see within range. Until the spell ends, the target’s speed is doubled, it gains a +2 bonus to AC, it has advantage on Dexterity saving throws, and it gains an additional action on each of its turns. That action can be used only to take the Attack (one weapon attack only), Dash, Disengage, Hide, or Use an Object action. When the spell ends, the target can’t move or take actions until after its next turn, as a wave of lethargy sweeps over it.",
        },
        "Protection from Energy": {
          type: "action",
          desc: "Concentration: Up to hour - For the duration, the willing creature you touch has resistance to one damage type of your choice: acid, cold, fire, lightning, or thunder.",
        },
      },
    },
  },
  francis: {
    STR: { value: 10, bonus: 0 },
    DEX: { value: 10, bonus: 0 },
    CON: { value: 17, bonus: 4 },
    INT: { value: 16, bonus: 4 },
    WIS: { value: 14, bonus: 2 },
    CHR: { value: 14, bonus: 2 },
    hitPoints: 69, // Added hit points for Francis
    goldpieces: 0,
    silverpieces: 0,
    bronzepieces: 0,
    channel_divinity: {},
    spells: {},
  },
};

// Character slice with actions to update hit points and resources
const characterSlice = createSlice({
  name: "character",
  initialState: initialCharacterState,
  reducers: {
    updateHitPoints(state, action) {
      const { characterName, newHitPoints } = action.payload;
      if (state[characterName]) {
        state[characterName].hitPoints = newHitPoints;
      }
    },
    updateResources(state, action) {
      const { characterName, goldpieces, silverpieces, bronzepieces } = action.payload;
      if (state[characterName]) {
        state[characterName].goldpieces = goldpieces;
        state[characterName].silverpieces = silverpieces;
        state[characterName].bronzepieces = bronzepieces;
      }
    },
  },
});

// Export actions to update hit points and resources
export const { updateHitPoints, updateResources } = characterSlice.actions;

// Configure and export the store
const store = configureStore({
  reducer: { character: characterSlice.reducer },
});

export default store;
