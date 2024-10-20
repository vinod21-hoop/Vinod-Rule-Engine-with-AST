import express from 'express';
import { createRule, combineRules, evaluateRule } from './ruleEngine';
import { saveRule, getRule, updateRule, deleteRule, getAllRules } from './database';

const router = express.Router();

router.get('/rules', async (req, res) => {
  try {
    const rules = await getAllRules(); // Call the function to get all rules
    res.json(rules); // Send the rules back as the response
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch rules' });
  }
});


router.post('/create-rule', async (req, res) => {
  try {
    const { name, ruleString } = req.body;
    const rule = createRule(ruleString);
    await saveRule(name, rule);
    res.json({ success: true, message: 'Rule created successfully' });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'An unknown error occurred';
    res.status(400).json({ success: false, message });
  }
});

router.post('/combine-rules', async (req, res) => {
  try {
    const { name, rules } = req.body;
    const combinedRule = combineRules(rules);
    await saveRule(name, combinedRule);
    res.json({ success: true, message: 'Rules combined successfully' });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'An unknown error occurred';
    res.status(400).json({ success: false, message });
  }
});

router.post('/evaluate-rule', async (req, res) => {
  try {
    const { name, data } = req.body;
    const ruleDoc = await getRule(name);
    if (!ruleDoc) {
      return res.status(404).json({ success: false, message: 'Rule not found' });
    }
    const result = evaluateRule(ruleDoc.rule, data);
    res.json({ success: true, result });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'An unknown error occurred';
    res.status(400).json({ success: false, message });
  }
});

router.put('/update-rule', async (req, res) => {
  try {
    const { name, ruleString } = req.body;
    const rule = createRule(ruleString);
    await updateRule(name, rule);
    res.json({ success: true, message: 'Rule updated successfully' });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'An unknown error occurred';
    res.status(400).json({ success: false, message });
  }
});

router.delete('/delete-rule/:name', async (req, res) => {
  try {
    const { name } = req.params;
    await deleteRule(name);
    res.json({ success: true, message: 'Rule deleted successfully' });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'An unknown error occurred';
    res.status(400).json({ success: false, message });
  }
});

export default router;
