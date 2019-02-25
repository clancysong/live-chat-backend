import Router from 'koa-router'
import authRouter from './auth'
import userRouter from './user'
import response from '../../utils/response'
import session from '../../utils/session'

const router = new Router({ prefix: '/v1' })

router.use('/*', async (ctx, next) => {
  const isPathAllowed = () => {
    const allowedPaths = ['/api/v1/auth/login', '/api/v1/auth/register']
    return allowedPaths.some(path => ctx.path === path)
  }

  if (session.isAuthenticated(ctx) || isPathAllowed()) await next()
  else response.error(ctx, 'Authentication failed', 401)
})

router.use(authRouter.routes())
router.use(userRouter.routes())

export default router
