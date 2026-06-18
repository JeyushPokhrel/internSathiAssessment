

import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';


const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });


// GET /applications
// Fetch applications with optional filters and  pagination
export const getAllApplications = async (req, res, next) => {
  try {
    const { status, search, page = 1, limit = 10 } = req.query;

    const query = {
      where: {},
      orderBy: { applied_date: 'desc' },
    };

   
    if (status && status !== 'All') {
      query.where.status = status;
    }

    if (search) {
      query.where.OR = [
        { company_name: { contains: search, mode: 'insensitive' } },
        { job_title: { contains: search, mode: 'insensitive' } },
      ];
    }

    // Pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);
    query.skip = skip;
    query.take = parseInt(limit);

    const applications = await prisma.application.findMany(query);
    const total = await prisma.application.count({ where: query.where });

    res.json({
      success: true,
      data: applications,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    next(error);
  }
};


export const getApplicationById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const application = await prisma.application.findUnique({
      where: { id },
    });

    if (!application) {
      const error = new Error('Application not found');
      error.status = 404;
      throw error;
    }

    res.json({ success: true, data: application });
  } catch (error) {
    next(error);
  }
};


export const createApplication = async (req, res, next) => {
  try {
    const { company_name, job_title, job_type, status, applied_date, notes } = req.body;

    // Basic validation
    if (!company_name || company_name.length < 2) {
      return res.status(400).json({
        success: false,
        message: 'Invalid company name.',
      });
    }

    if (!job_title) {
      return res.status(400).json({
        success: false,
        message: 'Job title is required.',
      });
    }

    if (!applied_date) {
      return res.status(400).json({
        success: false,
        message: 'Applied date is required.',
      });
    }

    const application = await prisma.application.create({
      data: {
        company_name,
        job_title,
        job_type,
        status,
        applied_date: new Date(applied_date),
        notes,
      },
    });

    res.status(201).json({ success: true, data: application });
  } catch (error) {
    next(error);
  }
};


export const updateApplication = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { company_name, job_title, job_type, status, applied_date, notes } = req.body;

    // Only update fields that are actually provided
    const data = {};
    if (company_name) data.company_name = company_name;
    if (job_title) data.job_title = job_title;
    if (job_type) data.job_type = job_type;
    if (status) data.status = status;
    if (applied_date) data.applied_date = new Date(applied_date);
    if (notes !== undefined) data.notes = notes;

    const application = await prisma.application.update({
      where: { id },
      data,
    });

    res.json({ success: true, data: application });
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({
        success: false,
        message: 'Application not found.',
      });
    }
    next(error);
  }
};


export const deleteApplication = async (req, res, next) => {
  try {
    const { id } = req.params;

    await prisma.application.delete({
      where: { id },
    });

    res.json({
      success: true,
      message: 'Application deleted successfully.',
    });
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({
        success: false,
        message: 'Application not found.',
      });
    }
    next(error);
  }
};