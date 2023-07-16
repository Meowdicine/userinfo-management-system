export const handleErrors = (err, res, status = 400, message = undefined) => {
  console.error('err: ', err)
  let errors = {}
  const key = Object.keys(err?.keyValue ?? err?.errors ?? {})?.[0] || 'field'

  if (message) {
    errors = { message }
  } else {
    errors = {
      [key]:
        err?.code === 11000
          ? `${key} already exists`
          : err?.errors?.[key]?.message ||
            err.message ||
            'Something went wrong!'
    }
  }

  res.status(status).json({ errors })
}

export const getPagination = ({ page, total, limit = 5 }) => {
  const skip = limit * parseInt(page - 1)
  const last_page = Math.ceil(total / limit)

  if (total % limit != 0) {
    if (page === last_page) {
      limit = total % limit
    }
  }

  const to = skip + limit < total ? skip + limit : total

  const pagination = {
    to,
    skip,
    limit,
    total,
    last_page,
    from: skip + 1,
    current_page: +page
  }

  return pagination
}

export default handleErrors
